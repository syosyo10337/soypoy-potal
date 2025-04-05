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
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-8 md:py-6 bg-black/60 backdrop-blur-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="SOY-POY"
            width={200}
            height={50}
            className="h-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white text-lg font-bold hover:text-gray-200 transition-colors"
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
