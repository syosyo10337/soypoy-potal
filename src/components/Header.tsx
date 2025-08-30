"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const navItems = [
  { name: "About", href: "/about" },
  { name: "Events", href: "/events" },
  { name: "History", href: "/history" },
  { name: "Social", href: "/social" },
  { name: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b"
      style={{
        backgroundColor: "#F3F0E6",
        borderBottomColor: "#E5E0D8",
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Link
            href="/"
            className="text-2xl font-bold"
            style={{ color: "#000000" }}
          >
            SOYPOY
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <NavigationMenu>
            <NavigationMenuList className="gap-6">
              {navItems.map((item, index) => (
                <NavigationMenuItem key={item.name}>
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className="px-4 py-2 transition-colors duration-200 hover:bg-black/5 rounded-md font-medium"
                        style={{ color: "#000000" }}
                      >
                        {item.name}
                      </Link>
                    </NavigationMenuLink>
                  </motion.div>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.div
          className="md:hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
            className="p-2 hover:bg-black/5"
            style={{ color: "#000000" }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mounted && isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] md:hidden"
          style={{ backgroundColor: "#F3F0E6" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col h-screen">
            {/* Mobile Header */}
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderBottomColor: "#E5E0D8" }}
            >
              <Link
                href="/"
                className="text-2xl font-bold"
                style={{ color: "#000000" }}
              >
                SOYPOY
              </Link>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-black/5"
                style={{ color: "#000000" }}
              >
                <X size={24} />
              </Button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex-1 px-4 py-8">
              <ul className="space-y-6">
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      className="block text-xl font-medium py-3 px-4 rounded-md transition-colors duration-200 hover:bg-black/5"
                      style={{ color: "#000000" }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
}
