"use client";

import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { NAV_ITEMS } from "./constant";
import Logo from "./Logo";
import { NavMenu } from "./NavMenu";
import { useHeaderVisibility } from "./useHeaderVisibility";

export default function Header() {
  const isVisible = useHeaderVisibility();

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50",
        !isVisible && "pointer-events-none",
      )}
      initial={{ y: -100, opacity: 0 }}
      animate={{
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div
        className={cn(
          "max-w-8xl mx-auto flex items-center justify-between",
          "py-2 px-4 md:py-4 md:px-10",
        )}
      >
        <Logo />
        <NavMenu navItems={NAV_ITEMS} />
      </div>
    </motion.header>
  );
}
