"use client";

import { Menu } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import { cn } from "@/utils/cn";
import type { NavItem } from "./constant";
import { NAV_ITEMS } from "./constant";
import Logo from "./Logo";
import { useHeaderVisibility } from "./useHeaderVisibility";

export default function MobileHeader() {
  const isVisible = useHeaderVisibility("hero-section");

  return (
    <motion.header
      className={cn(
        "sm:hidden",
        "fixed top-0 left-0 right-0 z-50 bg-soypoy-main",
        !isVisible && "pointer-events-none",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={
        isVisible ? { duration: 0.3, ease: "easeInOut" } : { duration: 0 }
      }
    >
      <div
        className={cn(
          "max-w-8xl mx-auto flex items-center justify-between",
          "py-2 pl-4",
        )}
      >
        <Logo />
        <MobileMenu navItems={NAV_ITEMS} />
      </div>
    </motion.header>
  );
}

function MobileMenu({ navItems }: { navItems: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="p-3 hover:bg-black/5 text-soypoy-secondary  font-display"
          aria-label="メニューを開く"
        >
          <Menu className="size-8" strokeWidth={1.2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full h-full soypoy-main border-none p-0 [&>button]:text-soypoy-secondary [&>button]:hover:bg-black/5"
      >
        <SheetHeader className="absolute top-0 left-0 w-0 h-0 overflow-hidden">
          <SheetTitle className="sr-only">ナビゲーションメニュー</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 py-16 px-8 text-right">
          <ul className="space-y-4 text-right">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="block text-lg font-bold py-6 px-4 active:text-soypoy-accent transition-all duration-200 text-soypoy-secondary text-right"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
