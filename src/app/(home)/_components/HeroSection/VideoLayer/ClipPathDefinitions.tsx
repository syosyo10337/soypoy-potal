"use client";

import { type MotionValue, motion } from "motion/react";
import { CLIP_PATH_IDS } from "./constants";

interface ClipPathDefinitionsProps {
  mobilePath: MotionValue<string>;
  desktopPath: MotionValue<string>;
}

export default function ClipPathDefinitions({
  mobilePath,
  desktopPath,
}: ClipPathDefinitionsProps) {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id={CLIP_PATH_IDS.MOBILE} clipPathUnits="objectBoundingBox">
          <motion.path d={mobilePath} />
        </clipPath>
        <clipPath id={CLIP_PATH_IDS.DESKTOP} clipPathUnits="objectBoundingBox">
          <motion.path d={desktopPath} />
        </clipPath>
      </defs>
    </svg>
  );
}
