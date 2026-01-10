"use client";

import type { MotionValue } from "motion/react";
import { useMotionValue } from "motion/react";
import { useEffect, useState } from "react";

/**
 * ページ全体のスクロール進行度を追跡するフック
 * @returns scrollProgress - 0.0 ~ 1.0 のスクロール進行度（MotionValue）
 */
export function useScrollProgress(): MotionValue<number> {
  const scrollProgress = useMotionValue(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = scrollHeight - clientHeight;

      if (scrollableHeight <= 0) {
        scrollProgress.set(0);
        return;
      }

      const progress = scrollTop / scrollableHeight;
      scrollProgress.set(Math.max(0, Math.min(1, progress)));
    };

    updateScrollProgress();
    window.addEventListener("scroll", updateScrollProgress, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, [scrollProgress]);

  return scrollProgress;
}

/**
 * スクロール進行度に基づいた真偽値を返すフック
 * @param threshold - 閾値（0.0 ~ 1.0）
 * @returns isVisible - 閾値を超えたかどうか
 */
export function useScrollThreshold(threshold: number): boolean {
  const scrollProgress = useScrollProgress();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollProgress.on("change", (latest) => {
      setIsVisible(latest > threshold);
    });

    return unsubscribe;
  }, [scrollProgress, threshold]);

  return isVisible;
}
