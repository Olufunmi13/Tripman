import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';
import moment from 'moment-timezone';
// import { auth } from '@/auth';
export async function POST(req: Request) {
  const body = await req.json();
  console.log('Request body:', body);
  const isoDateTime = convertToIsoDateTime(body.startTime);
    const parsedEstimatedCost = parseFloat(body.estimatedCost.replace(/[^\d.-]/g, ''));
  try {
    const { tripId, activity, startTime, location, estimatedCost, date } = body;

    // Validate input data
    if (!tripId || !activity || !startTime || !location || !estimatedCost || !date) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newEvent = await prisma.event.create({
      data: {
        activity: body.activity,
        startTime: isoDateTime,
        estimatedCost: parsedEstimatedCost,
        location: body.location,
        tripId: body.tripId,
        date: new Date(body.date),
      },
    });
    console.log('Date saved to database:', newEvent.date.toDateString());

    return NextResponse.json(
      { message: 'Event created successfully', trip: newEvent },
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

// Helper function to convert 'HH:mm A' to ISO-8601 DateTime
function convertToIsoDateTime(timeString: string): Date {
  const [time, meridiem] = timeString.split(' ');
  const [hours, minutes] = time.split(':').map(Number);

  const date = moment()
    .set('hour', meridiem === 'PM' ? hours + 12 : hours)
    .set('minute', minutes)
    .set('second', 0)
    .set('millisecond', 0);

  return date.toDate();
}

export async function PUT(req: Request) {
  const url = new URL(req.url);
  const eventId = parseInt(url.searchParams.get('id') || '', 10);

  if (!eventId) {
    return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
  }

  const body = await req.json();
  const isoDateTime = convertToIsoDateTime(body.startTime);
  const estimatedCost = parseFloat(body.estimatedCost.replace(/[^\d.-]/g, ''));
  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        activity: body.activity,
        startTime: isoDateTime,
        estimatedCost: estimatedCost,
        location: body.location,
        tripId: body.tripId,
        date: new Date(body.date),
      },
    });

    return NextResponse.json(
      { message: 'Event updated successfully', event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}
