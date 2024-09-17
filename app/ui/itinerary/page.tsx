'use client';

import React from 'react'
import { useParams } from 'next/navigation';
// import { useRouter } from 'next/router';
import { Text } from '@mantine/core';
import { useItinerary } from '@/app/ItineraryContext';

interface QueryParams {
  trip?: string;
  startDate?: string;
  endDate?: string;
  budget?: number;
}
export default function Itinerary() {
  const { itinerary } = useItinerary();
  // const router = useRouter();
  // const { trip, startDate, endDate, budget } = router.query;
  // const params = useParams<QueryParams>();

  // const { trip, startDate, endDate, budget } = params; 

  return (
    <div className='w-3/4 my-0 mx-auto'>
     {itinerary ? (
        <>
          <Text>Trip: {itinerary.trip}</Text>
          <Text>Start Date: {itinerary.startDate}</Text>
          <Text>End Date: {itinerary.endDate}</Text>
          <Text>Budget: {itinerary.budget}</Text>
        </>
      ) : (
        <Text>No itinerary data available.</Text> // Fallback message
      )}
    </div>
  )
}
