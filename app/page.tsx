"use client";

import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventSection from "./components/EventSection";
import AccessSection from "./components/AccessSection";
import { throttle } from "lodash";

// セクションコンポーネントの配列
const sectionComponents = [HeroSection, AboutSection, EventSection, AccessSection];

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
  const scrollToSection = useCallback((i: number, smooth = true) => {
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
    setTimeout(() => {
      scrollingToSection.current = false;
    }, smooth ? 500 : 50);
  }, [viewportHeight, getViewportHeight]);

  // スクロール処理を最適化
  const handleScroll = useCallback(() => {
    if (scrollingToSection.current) return;

    const height = viewportHeight || getViewportHeight();
    if (height === 0) return;

    const scroll = window.scrollY;
    lastScrollY.current = scroll;

    // 既存のタイムアウトをクリア
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // スクロール終了を検出するタイムアウト
    scrollTimeoutRef.current = setTimeout(() => {
      // スクロールが止まったら最も近いセクションにスナップ
      if (!scrollingToSection.current) {
        const nearestSectionIndex = Math.round(lastScrollY.current / height);
        if (nearestSectionIndex >= 0 && 
            nearestSectionIndex < sectionComponents.length && 
            nearestSectionIndex !== index) {
          scrollToSection(nearestSectionIndex, false);
        }
      }
    }, 150);

    // 現在のセクションインデックスを計算
    const i = Math.min(
      Math.max(0, Math.floor(scroll / height)),
      sectionComponents.length - 1
    );
    
    // 次のセクションへの進行度を計算
    const progress = (scroll % height) / height;
    
    // 現在のセクションが変わった場合のみインデックスを更新
    if (i !== index) {
      setIndex(i);
    }
    
    // 半径の計算を安定化
    const newRadius = Math.max(0, Math.min(150, progress * 150));
    setRadius(newRadius);
  }, [viewportHeight, getViewportHeight, index, scrollToSection]);

  // スロットル化されたスクロールハンドラー
  const throttledScrollHandler = useMemo(
    () => throttle(handleScroll, 16), // 約60fpsに相当
    [handleScroll]
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
    [handleResize]
  );

  useEffect(() => {
    // 初期化時にビューポートの高さを設定
    setViewportHeight(getViewportHeight());
    
    // イベントリスナーを追加
    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    window.addEventListener("resize", throttledResizeHandler, { passive: true });
    window.visualViewport?.addEventListener("resize", throttledResizeHandler, { passive: true });
    
    // 初期スクロール位置を処理
    throttledScrollHandler();
    
    // クリーンアップ
    return () => {
      window.removeEventListener("scroll", throttledScrollHandler);
      window.removeEventListener("resize", throttledResizeHandler);
      window.visualViewport?.removeEventListener("resize", throttledResizeHandler);
      
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
  const CurrentComponent = useMemo(
    () => sectionComponents[index],
    [index]
  );
  
  const NextComponent = useMemo(
    () => sectionComponents[index + 1],
    [index]
  );
  
  const showNext = radius > 0 && NextComponent;

  return (
    <div className="relative" style={{ height: `${sectionComponents.length * 100}vh` }}>
      <div className="sticky top-0 w-full h-screen">
        <div className="absolute inset-0 z-0 overflow-auto">
          <CurrentComponent onArrowClick={() => scrollToSection(index + 1)} />
        </div>

        {showNext && (
          <div
            className="absolute inset-0 z-10 overflow-auto"
            style={{
              WebkitClipPath: `circle(${radius}% at center)`,
              clipPath: `circle(${radius}% at center)`,
              willChange: "clip-path",
              transform: "translateZ(0)", // GPUアクセラレーションを有効化
            }}
          >
            <NextComponent onArrowClick={() => scrollToSection(index + 2)} />
          </div>
        )}

        <div className="fixed right-2 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {sectionComponents.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-colors duration-200 cursor-pointer ${i === index ? "bg-[#00c896] w-3 h-3" : "bg-gray-400 w-2 h-2"}`}
              onClick={() => scrollToSection(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
