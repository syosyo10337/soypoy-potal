"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const navItems = [
  { name: "ABOUT", href: "/about" },
  { name: "MEMBERS", href: "/members" },
  { name: "EVENTS", href: "/events" },
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
    <header className="fixed top-0 right-0 z-50 p-3 md:p-4">
      <motion.button
        type="button"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-[10000] p-2 text-black"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <div className="relative w-6 h-5">
          <span
            className={`absolute left-0 w-full h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "top-2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 top-2 w-full h-0.5 bg-black transition-opacity duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`absolute left-0 w-full h-0.5 bg-black transition-all duration-300 ${
              isOpen ? "top-2 -rotate-45" : "top-4"
            }`}
          />
        </div>
      </motion.button>

      {mounted &&
        createPortal(
          <>
            <div
              className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[9998] transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
              onClick={() => setIsOpen(false)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setIsOpen(false);
                }
              }}
              role="button"
              tabIndex={0}
            />
            <div
              className={`fixed inset-0 z-[9999] flex flex-col h-screen transition-all duration-500 ${
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8 pointer-events-none"
              }`}
            >
              <div className="flex justify-end p-4">
                <button
                  type="button"
                  aria-label="メニューを閉じる"
                  onClick={() => setIsOpen(false)}
                  className="text-white p-2 hover:text-gray-300 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <nav className="flex items-center justify-center flex-1 w-full">
                <ul className="w-full max-w-md mx-auto space-y-8 p-8">
                  {navItems.map((item, index) => (
                    <li
                      key={item.name}
                      className="overflow-hidden"
                      style={{
                        transform: isOpen
                          ? "translateY(0)"
                          : "translateY(20px)",
                        opacity: isOpen ? 1 : 0,
                        transition: `all 0.5s ease ${index * 0.1 + 0.2}s`,
                      }}
                    >
                      <Link
                        href={item.href}
                        className="block text-white text-3xl font-zen-old-mincho hover:text-gray-300 transition-colors duration-300 py-4 text-center"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>,
          document.body,
        )}
    </header>
  );
}
