import React from "react";
import { CirclePlus } from "tabler-icons-react";
import Link from "next/link";
import Image from "next/image";
import Avatarr from "../lib/Avatarr.jpg"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-white shadow-lg shadow-gray-300/50 h-14 w-screen fixed top-0">
      <div className="w-8 h-8 mt-3 mb-[5px] ml-3">
      <Link
        className="mb-2 flex items-center justify-start rounded-md bg-[#ffff]"
        href="/"
      >
        <div className="flex gap-1 ">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B68AFF] to-[#3E16B6]"></span>
          <span className="hidden md:block"> TripHub</span>
        </div>
      </Link>
      </div>
      
      <div className="hidden sm:flex sm:gap-1 sm:items-center sm:justify-center sm:mr-1">
        <Link href="/ui/createtrip">
          <button className="flex items-center px-4 py-2 rounded-md bg-purple-500 text-white hover:bg-purple-600 transition-colors duration-200 gap-1">
            <CirclePlus />
            Create Trip
          </button>
        </Link>
        <Image
          src={Avatarr}
          alt="avatar"
          width={30}
          height={30}
          className="rounded-[50%]"
        />
      </div>
    </nav>
  );
}
