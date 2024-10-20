'use client';

import { Button, Group } from '@mantine/core';
import SideNav from './ui/sidebar';
import Navbar from './ui/navbar';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Login from './ui/login/page';

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/ui/login');
    }
  }, [status, router]);

  return (
    <>
      {status === 'authenticated' ? (
        <>
          <SideNav />
          <main>
            <Navbar />
          </main>
        </>
      ) : (
        <Login />
      )}
    </>
  );
}
