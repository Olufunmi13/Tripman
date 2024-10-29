'use client';

import { useState, useEffect } from "react";
import { useSession } from 'next-auth/react';
import TripCard from "@/app/components/tripcard/tripCard";
import { Trip } from "@/app/interface";
import { Box, Container, Title } from "@mantine/core";
import axios from 'axios';

export default function TripsHome() {
    const {data: session, status} = useSession();
    const [trips, setTrips] = useState<{ upcoming: Trip[]; past: Trip[]  } | null>(null);
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get('/api/home');
                setTrips(response.data.trips);
            } catch (error) {
                console.error('Error fetching trips:', error);
            }
        };

        fetchTrips();
    }, [status]);


    if (status === 'unauthenticated') {
        return <div>Please sign in to view your trips.</div>;
    }

    if (!trips) {
        return <div>Loading trips...</div>;
    }
    return(
        <Container fluid className="mt-16 mx-2 w-full sm:w-4/5 md:ml-60 h-full">
            <Title order={2}>Trips</Title>
            <div className="mb-8">
                <Title order={3} className="text-2xl font-semibold mb-4">Upcoming Trips</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trips.upcoming.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>
            <div>
                <Title order={3} className="text-2xl font-semibold mb-4">Past Trips</Title>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {trips.past.map((trip) => (
                        <TripCard key={trip.id} trip={trip} />
                    ))}
                </div>
            </div>
        </Container>
    )
}