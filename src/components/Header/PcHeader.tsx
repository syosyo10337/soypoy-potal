"use client";

import { motion } from "motion/react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/shadcn/navigation-menu";
import { cn } from "@/utils/cn";
import { NAV_ITEMS, type NavItem } from "./constant";
import Logo from "./Logo";
import { useHeaderVisibility } from "./useHeaderVisibility";

// TODO: MobileHeaderと共通化する際に、mix-blend-modeとanimationのロジックを抽出する
export default function PcHeader() {
  const isVisible = useHeaderVisibility("hero-section");

  return (
    <motion.header
      className={cn(
        "hidden sm:block",
        "fixed top-0 left-0 right-0 z-50",
        "text-soypoy-main mix-blend-exclusion",
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
          "py-4 px-10",
        )}
      >
        <Logo />
        <PcMenu navItems={NAV_ITEMS} />
      </div>
    </motion.header>
  );
}

function PcMenu({ navItems }: { navItems: NavItem[] }) {
  return (
    <NavigationMenu>
      <NavigationMenuList className="gap-4 pr-2">
        {navItems.map((item) => (
          <NavigationMenuItem key={item.name}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                // NOTE: NavigationMenuLinkのtext-smが優先されるので、text-lgを強制的に指定
                // TODO: mix-blend-modeに対応するため、text-inheritを使用することを検討
                className="px-2 py-3 !text-lg font-bold active:text-soypoy-accent transition-colors duration-200 text-inherit font-display"
              >
                {item.name}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
