"use client";

import { useEffect } from "react";

/**
 * ホームページでブラウザバック時にスクロール位置をトップにリセットするコンポーネント
 * Next.jsのデフォルトのスクロール復元機能を無効化
 *
 * 注意: このコンポーネントはUIを持たないが、ページ全体をClient Componentにしないために
 * 意図的にコンポーネントとして実装している（Server Componentの利点を保持するため）
 */
export default function ScrollReset() {
  useEffect(() => {
    window.scrollTo(0, 0);

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return null;
}
