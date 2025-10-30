"use client";

import { motion } from "motion/react";
import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import { HeroSecRibon } from "./assets";
import { InnerContent } from "./InnerContent";

export default function RibonArea() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 5,
        duration: 1,
        ease: "easeOut",
      }}
      className={cn(
        "max-w-4xl",
        "xl:max-w-5xl",
        "2xl:max-w-[60vw]",
        "relative w-full mx-auto",
        `z-[${Z_INDEX.ribonArea}]`,
        "-mt-[clamp(78px,30vw,180px)]",
        "sm:-mt-[clamp(140px,20vw,180px)]",
        "lg:-mt-[clamp(160px,16vw,220px)]",
        "2xl:-mt-[clamp(180px,12vw,280px)]",
      )}
    >
      <HeroSecRibon
        className={cn("relative w-full", `z-[${Z_INDEX.archDecoration}]`)}
      />
      <InnerContent
        className={cn(
          "relative",
          `z-[${Z_INDEX.ribonArea}]`,
          "px-14 md:px-27 lg:px-19",
          "-mt-8",
          "sm:-mt-16",
          "lg:-mt-20",
        )}
      />
    </motion.div>
  );
}
