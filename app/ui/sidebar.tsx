import Link from "next/link";
import NavLinks from "@/app/ui/navlink";
import { Container } from "@mantine/core";

export default function SideNav() {
  
  return (
    <Container fluid className="hidden md:w-[20%] md:h-screen md:flex md:flex-col md:px-3 md:py-4 md:mt-10 md:fixed md:left-0 md:z-50 md:shadow-lg md:shadow-gray-500/50">
      <div className="hidden md:flex md:flex-col md:justify-between md:mt-2 md:gap-4">
        <NavLinks />
      </div>
    </Container>
  );
}
