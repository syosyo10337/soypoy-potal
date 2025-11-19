"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/shadcn/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shadcn/sheet";
import type { NavItem } from "./constant";

export function NavMenu({ navItems }: { navItems: NavItem[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="p-3 hover:bg-white/10 text-inherit font-display rounded-lg"
          aria-label="メニューを開く"
        >
          <Menu className="size-8" strokeWidth={1.2} />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full h-full bg-soypoy-main border-none p-0 [&>button]:text-soypoy-secondary [&>button]:hover:bg-black/5"
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
