import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import { auth } from '@/auth';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tripName, startDate, endDate, budget, currency } = body;

    // Validate input data without dropZone
    if (!tripName || !startDate || !endDate || !budget || !currency) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create a new trip without dropZone
    const newTrip = await prisma.trip.create({
      data: {
        user: { connect: { id: session.user.id } },
        tripName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseFloat(budget),
        currency,
      },
    });

    return NextResponse.json(
      { message: 'Trip created successfully', tripId: newTrip.id },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json(
      { message: 'Failed to create trip', error: String(error) },
      { status: 500 }
    );
  }
}
