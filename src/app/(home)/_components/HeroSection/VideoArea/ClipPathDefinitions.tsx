"use client";

import { motion } from "motion/react";
import { useClipPathAnimation } from "./useClipPathAnimation";

export default function ClipPathDefinitions() {
  const { mobilePath, desktopPath } = useClipPathAnimation();

  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="videoClipMobile" clipPathUnits="objectBoundingBox">
          <motion.path d={mobilePath} />
        </clipPath>
        <clipPath id="videoClipDesktop" clipPathUnits="objectBoundingBox">
          <motion.path d={desktopPath} />
        </clipPath>
      </defs>
    </svg>
  );
}
