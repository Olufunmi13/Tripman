import Link from "next/link";
import NavLinks from "@/app/ui/navlink";

export default function SideNav() {
  
  return (
    <div className="hidden md:w-1/5 md:h-screen md:flex md:flex-col md:px-3 md:py-4 md:fixed md:left-0 md:z-50 md:shadow-lg md:shadow-gray-500/50">
      <Link
        className="mb-2 flex items-center justify-start rounded-md bg-[#ffff]"
        href="/"
      >
        <div className="flex gap-1 ">
          <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#B68AFF] to-[#3E16B6]"></span>
          <span className="hidden md:block"> TripHub</span>
        </div>
      </Link>
      <div className="hidden md:flex md:flex-col md:justify-between">
        <NavLinks />
      </div>
    </div>
  );
}
