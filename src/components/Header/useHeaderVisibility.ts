import { useEffect, useState } from "react";

/**
 * Headerの表示/非表示を制御するフック
 *
 * ページ全体のスクロール位置が30%を超えたら表示
 */
export function useHeaderVisibility() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = scrollHeight - clientHeight;

      if (scrollableHeight <= 0) {
        setIsVisible(false);
        return;
      }

      const scrollPercentage = scrollTop / scrollableHeight;
      setIsVisible(scrollPercentage > 0.3);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return isVisible;
}
