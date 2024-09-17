import { Button, Group } from '@mantine/core';
import SideNav from './ui/sidebar';
import Navbar from './ui/navbar';

export default function Home() {
  return (
    <>
     <SideNav />
      <main>
        <Navbar />
      </main>
    </>
  );
}
