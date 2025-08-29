"use client";

import { motion } from "framer-motion";
import { throttle } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AboutSection from "./_components/AboutSection";
import AccessSection from "./_components/AccessSection";
import HeroSection from "./_components/HeroSection";

// セクション名の定義
const sectionNames = ["hero", "about", "access"];

// セクションコンポーネントの配列
const sectionComponents = [HeroSection, AboutSection, AccessSection];

export default function Page() {
  const [radius, setRadius] = useState(0);
  const [index, setIndex] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const scrollingToSection = useRef(false);

  // ビューポートの高さを取得する関数
  const getViewportHeight = useCallback(() => {
    return window.visualViewport?.height ?? window.innerHeight;
  }, []);

  // セクションへのスクロール処理
  const scrollToSection = useCallback(
    (i: number, smooth = true) => {
      if (i < 0 || i >= sectionComponents.length) return;

      const height = viewportHeight || getViewportHeight();
      const targetPosition = height * i;

      // スクロール中フラグを設定
      scrollingToSection.current = true;

      window.scrollTo({
        top: targetPosition,
        behavior: smooth ? "smooth" : "auto",
      });

      // インデックスを即座に更新
      setIndex(i);
      setRadius(0);

      // スクロールアニメーション完了後にフラグをリセット
      setTimeout(
        () => {
          scrollingToSection.current = false;
        },
        smooth ? 500 : 50,
      );
    },
    [viewportHeight, getViewportHeight],
  );

  // スクロール処理を最適化
  const handleScroll = useCallback(() => {
    if (scrollingToSection.current) return;

    // 読み取りフェーズ
    const height = viewportHeight || getViewportHeight();
    const scroll = window.scrollY;
    const nextIndex = Math.min(
      Math.max(0, Math.floor(scroll / height)),
      sectionComponents.length - 1,
    );
    const progress = (scroll % height) / height;
    lastScrollY.current = scroll;

    // 既存のタイムアウトをクリア
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // RAF内で状態更新を行う
    requestAnimationFrame(() => {
      if (nextIndex !== index) {
        setIndex(nextIndex);
      }
      const newRadius = Math.max(0, Math.min(150, progress * 150));
      setRadius(newRadius);
    });

    // スクロール終了検出
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollingToSection.current) {
        const nearestSectionIndex = Math.round(lastScrollY.current / height);
        if (
          nearestSectionIndex >= 0 &&
          nearestSectionIndex < sectionComponents.length &&
          nearestSectionIndex !== index
        ) {
          scrollToSection(nearestSectionIndex, false);
        }
      }
    }, 150);
  }, [viewportHeight, getViewportHeight, index, scrollToSection]);

  // スロットル化されたスクロールハンドラー
  const throttledScrollHandler = useMemo(
    () => throttle(handleScroll, 16), // 約60fpsに相当
    [handleScroll],
  );

  // リサイズ処理を最適化
  const handleResize = useCallback(() => {
    const height = getViewportHeight();
    setViewportHeight(height);
    handleScroll();
  }, [getViewportHeight, handleScroll]);

  // スロットル化されたリサイズハンドラー
  const throttledResizeHandler = useMemo(
    () => throttle(handleResize, 100),
    [handleResize],
  );

  useEffect(() => {
    // 初期化時にビューポートの高さを設定
    setViewportHeight(getViewportHeight());

    // イベントリスナーを追加
    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });
    window.addEventListener("resize", throttledResizeHandler, {
      passive: true,
    });
    window.visualViewport?.addEventListener("resize", throttledResizeHandler, {
      passive: true,
    });
    // 初期スクロール位置を処理
    throttledScrollHandler();

    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      window.removeEventListener("resize", throttledResizeHandler);
      window.visualViewport?.removeEventListener(
        "resize",
        throttledResizeHandler,
      );

      // スロットル関数のキャンセル
      throttledScrollHandler.cancel();
      throttledResizeHandler.cancel();

      // タイムアウトをクリア
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [getViewportHeight, throttledScrollHandler, throttledResizeHandler]);

  // メモ化されたコンポーネント参照
  const CurrentComponent = useMemo(() => sectionComponents[index], [index]);

  const NextComponent = useMemo(() => sectionComponents[index + 1], [index]);

  const showNext = radius > 0 && NextComponent;

  return (
    <div
      className="relative"
      style={{ height: `${sectionComponents.length * 100}vh` }}
    >
      <div className="sticky top-0 w-full h-screen overflow-hidden">
        <div
          className="absolute inset-0 z-0 overflow-auto"
          style={{ height: "100%" }}
        >
          <CurrentComponent onArrowClick={() => scrollToSection(index + 1)} />
        </div>

        {showNext && (
          <div
            className="absolute inset-0 z-10 overflow-auto"
            style={{
              WebkitClipPath: `circle(${radius}% at center)`,
              clipPath: `circle(${radius}% at center)`,
              willChange: radius > 0 && radius < 150 ? "clip-path" : "auto",
              transform: radius > 0 && radius < 150 ? "translateZ(0)" : "none",
              pointerEvents: radius > 100 ? "auto" : "none", // 円が大きくなったときのみポインターイベントを有効化
              height: "100%",
            }}
          >
            <NextComponent onArrowClick={() => scrollToSection(index + 2)} />
          </div>
        )}

        <div className="fixed right-2 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {sectionComponents.map((_, i) => (
            <motion.div
              key={sectionNames[i]}
              className={`rounded-full transition-colors duration-200 cursor-pointer ${i === index ? "bg-[#00c896] w-3 h-3" : "bg-gray-400 w-2 h-2"}`}
              onClick={() => scrollToSection(i)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: 1.0 + i * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
