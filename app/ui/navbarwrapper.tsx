'use client';

import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Specify paths where the Navbar should not appear
  const hideNavbarPaths = ['/ui/login', '/ui/signup'];

  const shouldHideNavbar = hideNavbarPaths.includes(pathname);

  if (shouldHideNavbar) {
    return null;
  }

  return <Navbar />;
}
