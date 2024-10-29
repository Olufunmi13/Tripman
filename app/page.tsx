'use client';

import { Button, Container, Group, Loader, Text } from '@mantine/core';
import SideNav from './ui/sidebar';
import Navbar from './ui/navbar';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TripsHome from './ui/home/page';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true, // This ensures the session is required to access the page
    onUnauthenticated() {
      // Redirect to the login page if unauthenticated
      router.push('/ui/login');
    },
  });

  // While the session is loading, show a loading state
  if (status === 'loading') {
    return (
      <div
        style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Group gap="sm" align="center">
          <Loader size="lg" variant="bars" />
          <Text size="lg" fw={500}>
            Authenticating your session...
          </Text>
          <Text size="sm" c="dimmed">
            Please wait while we verify your credentials. This might take a few seconds.
          </Text>
        </Group>
      </div>
    );
  }
  return (
    <Container fluid className='h-full'>
      <div className="flex">
        <SideNav />
        <main className="flex-grow">
          <TripsHome />
        </main>
      </div>
    </Container>
  );
}
