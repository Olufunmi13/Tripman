'use client';

import React from 'react';
import { PlaneTilt, Friends, Settings, Logout } from 'tabler-icons-react';
import Link from 'next/link';
import { Button } from '@mantine/core';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react"

type NavLinkItem = {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
};
export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  

  const links: NavLinkItem[] = [
    { name: 'My Trips', href: '/', icon: PlaneTilt },
    {
      name: 'Invite Friends',
      href: '/ui/createtrip',
      icon: Friends,
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      {links.map((link, index) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;
        return (
          <div key={index}>
            <Link
              key={index}
              href={link.href}
              className={`flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 ${
                isActive ? 'text-[#7539d6]' : ''
              }`}
            >
              <LinkIcon className={`w-6 ${isActive ? 'text-[#7539d6]' : ''}`} />
              <p className="hidden md:block">{link.name}</p>
            </Link>
          </div>
        );
      })}
      <div className="mt-72">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
        >
          <Settings className="w-6" />
          <p className="hidden md:block">Settings</p>
        </Link>
        <Button variant="transparent"
          className="w-full h-12  flex items-center justify-center gap-2 rounded-md text-black bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600"
          onClick={() => {
            // e.preventDefault();
            handleLogout();
          }}
        >
          <Logout className="w-6" />
          <p className="hidden md:block">Logout</p>
        </Button>
      </div>
    </>
  );
}
