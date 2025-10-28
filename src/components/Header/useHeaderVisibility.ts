import { useEffect, useState } from "react";

/**
 * HeroSectionの位置を監視し、Headerの表示/非表示を制御するフック
 *
 * HeroSectionの下限が画面の60%ラインより上に来たら表示
 */
export function useHeaderVisibility(heroSectionId: string) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const heroSection = document.getElementById(heroSectionId);
    if (!heroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // NOTE: HeroSectionの下限が画面の60%ラインより上に来たら表示
        setIsVisible(!entry.isIntersecting);
      },
      {
        rootMargin: "-60% 0px 40% 0px",
        threshold: 0,
      },
    );

    observer.observe(heroSection);

    return () => observer.disconnect();
  }, [heroSectionId]);

  return isVisible;
}
