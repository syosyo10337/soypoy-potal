"use client";

import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./MobileMenu";

const navItems = [
  { name: "ABOUT", href: "/about" },
  { name: "MEMBERS", href: "/members" },
  { name: "EVENTS", href: "/events" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-3 py-2 md:px-6 md:py-3 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="SOY-POY"
            width={200}
            height={50}
            className="w-32 sm:w-40 md:w-48 lg:w-56 h-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-base font-bold hover:text-gray-200 transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <MobileMenu />
      </div>
    </header>
  );
}
