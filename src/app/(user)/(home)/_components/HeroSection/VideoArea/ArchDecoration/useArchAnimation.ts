"use client";

import type { MotionValue } from "motion/react";
import { useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { useScrollProgress } from "@/utils/useScrollProgress";

interface ArchAnimationConfig {
  initialDuration?: number;
  fadeOutStart?: number;
  fadeOutEnd?: number;
}

const DEFAULT_CONFIG: Required<ArchAnimationConfig> = {
  initialDuration: 1.5,
  fadeOutStart: 0.2, // スクロール20%でフェードアウト開始
  fadeOutEnd: 0.25, // スクロール25%で完全に消える
};

export interface ArchAnimationReturn {
  opacity: MotionValue<number>;
  isInitialAnimationComplete: boolean;
  setIsInitialAnimationComplete: (value: boolean) => void;
}

export function useArchAnimation(
  config: ArchAnimationConfig = {},
): ArchAnimationReturn {
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] =
    useState(false);

  const scrollProgress = useScrollProgress();

  // 不透明度（20%でフェードアウト開始、25%で完全に消える）
  const opacity = useTransform(
    scrollProgress,
    [0, finalConfig.fadeOutStart, finalConfig.fadeOutEnd],
    [1, 1, 0],
  );

  // 初期アニメーション完了後にスクロール追従を有効化
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInitialAnimationComplete(true);
    }, finalConfig.initialDuration * 1000);

    return () => clearTimeout(timeout);
  }, [finalConfig.initialDuration]);

  return {
    opacity,
    isInitialAnimationComplete,
    setIsInitialAnimationComplete,
  };
}
