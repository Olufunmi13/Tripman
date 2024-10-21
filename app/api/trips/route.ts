import { NextResponse } from 'next/server';
import { getSession } from 'next-auth/react';
import { prisma } from '@/app/lib/prisma';
import {auth } from '@/auth';
export async function POST(req: Request) {
  try {
    console.log("Request received");
    const session = await getSession();
    console.log("Session:", session);
    if (!session || !session.user?.id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    console.log("Request body:", body);
    const { tripName, startDate, endDate, budget, currency, dropZone } = body;

    // Validate input data
    if (!tripName || !startDate || !endDate || !budget || !currency) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newTrip = await prisma.trip.create({
      data: {
        user: { connect: { id: Number(session.user.id) } },
        tripName,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        budget: parseFloat(budget),
        currency,
        dropZone: JSON.stringify(dropZone),
      },
    });

    return NextResponse.json({ message: 'Trip created successfully', trip: newTrip }, { status: 201 });
  } catch (error) {
    console.error('Error creating trip:', error);
    return NextResponse.json({ message: 'Failed to create trip', error: String(error) }, { status: 500 });
  }
}

