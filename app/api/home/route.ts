import { auth } from '@/auth';
import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(req: Request, { trip }: { trip: string }) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = session.user.id as string;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      trips: {
        select: {
          id: true,
          tripName: true,
          startDate: true,
          endDate: true,
          dropZone: {
            select: {
              id: true,
              originalName: true,
              path: true,
            },
          },
          events: true,
        },
        orderBy: { startDate: 'asc' },
      },
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const today = new Date();
  const categorizedTrips: {
    upcoming: any[];
    past: any[];
  } = {
    upcoming: [],
    past: [],
  };

  user.trips.forEach((trip) => {
    console.log('user details: ', user.trips)
    console.log('Processing trip:', trip.tripName);
    console.log('Trip dropZone:', JSON.stringify(trip.dropZone));
    const tripStartDate = new Date(trip.startDate);
    if (tripStartDate >= today) {
      categorizedTrips.upcoming.push({
        ...trip,
        image: trip.dropZone && trip.dropZone.length > 0 ? trip.dropZone[0].path : null,
        
      });
      console.log("Image paths:", categorizedTrips.upcoming.map(trip => trip.image));
    } else {
      categorizedTrips.past.push({
        ...trip,
        image: trip.dropZone && trip.dropZone.length > 0 ? trip.dropZone[0].path : null,
      });
      console.log("Image paths:", categorizedTrips.past.map(trip => trip.image));
    }
    console.log("Image paths:", categorizedTrips.upcoming.map(trip => trip.image));
console.log("Image paths:", categorizedTrips.past.map(trip => trip.image));
  });

  return NextResponse.json({ trips: categorizedTrips });
}

interface Trip {
  id: number;
  tripName: string;
  startDate: Date;
  endDate: Date;
  dropZone: [{ path: string }];
  events: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    tripId: number;
    activity: string;
    startTime: Date;
    location: string;
    estimatedCost: number;
    date: Date;
  }[];
  image?: string;
}
