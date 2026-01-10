"use client";

import { usePathname } from "next/navigation";
import { useScrollThreshold } from "@/utils/useScrollProgress";

/**
 * Headerの表示/非表示を制御するフック
 *
 * ページ全体のスクロール位置が30%を超えたら表示
 */
export function useHeaderVisibility() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const scrollExceeds30 = useScrollThreshold(0.3);

  if (!isHomePage) {
    return true;
  }

  return scrollExceeds30;
}
