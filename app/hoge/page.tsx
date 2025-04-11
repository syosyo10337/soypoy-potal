'use client';

import { useEffect, useRef, useState } from 'react';

const sections = [
  { id: 'hero', label: 'Hero', backgroundColor: '#f5f5dc' },
  { id: 'about', label: 'About', backgroundColor: '#0077cc' },
  { id: 'event', label: 'Event', backgroundColor: '#ffa500' },
  { id: 'access', label: 'Access', backgroundColor: '#228b22' },
];

export default function Page() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [targetIndex, setTargetIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // クライアントサイドでのマウント検出
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // スクロール位置の監視と進行度の計算
  useEffect(() => {
    if (!isMounted) return;

    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const sectionIndex = Math.floor(window.scrollY / viewportHeight);
      const nextIndex = Math.min(sections.length - 1, sectionIndex + 1);

      // 現在のセクションと次のセクションを設定
      setActiveIndex(sectionIndex);
      setTargetIndex(nextIndex);

      // セクション内でのスクロール進行度を計算（0〜1の範囲）
      const sectionStart = sectionIndex * viewportHeight;
      const sectionProgress = (window.scrollY - sectionStart) / viewportHeight;
      setProgress(Math.min(1, sectionProgress * 1.2)); // 少し早めに完了するように調整
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初期状態を設定

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMounted]);

  // 現在のセクションと次のセクションの背景色
  const currentBgColor = sections[activeIndex]?.backgroundColor || sections[0].backgroundColor;
  const nextBgColor = sections[targetIndex]?.backgroundColor || sections[0].backgroundColor;

  if (!isMounted) {
    return <div className="h-screen bg-beige"></div>; // 初期ローディング表示
  }

  return (
    <div className="relative">
      {/* 固定背景 */}
      <div className="fixed inset-0 z-0">
        {/* 現在のセクションの背景 */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: currentBgColor,
          }}
        />

        {/* 次のセクションの背景（円形マスクあり） */}
        {progress > 0 && activeIndex !== targetIndex && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              backgroundColor: nextBgColor,
              clipPath: `circle(${progress * 100}% at center)`,
              transition: 'clip-path 0.1s ease-out',
            }}
          />
        )}
      </div>

      {/* スクロール可能なコンテンツ */}
      <div
        ref={contentRef}
        className="relative z-10"
        style={{ height: `${sections.length * 100}vh` }}
      >
        {sections.map((section, index) => {
          const isCurrentSection = index === activeIndex;
          const isNextSection = index === targetIndex;

          // 現在のセクションの不透明度
          const currentOpacity = isCurrentSection ? (1 - progress) : 0;

          // 次のセクションの不透明度
          const nextOpacity = isNextSection && progress > 0 ? progress : 0;

          return (
            <section
              key={section.id}
              id={section.id}
              className="flex items-center justify-center h-screen sticky top-0"
            >
              {isCurrentSection && (
                <h2
                  className="text-5xl font-bold text-white drop-shadow-lg absolute"
                  style={{
                    opacity: currentOpacity,
                    transform: `scale(${1 - progress * 0.3})`,
                    transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                  }}
                >
                  {section.label}
                </h2>
              )}

              {isNextSection && progress > 0 && (
                <h2
                  className="text-5xl font-bold text-white drop-shadow-lg absolute"
                  style={{
                    opacity: nextOpacity,
                    transform: `scale(${0.7 + progress * 0.3})`,
                    transition: 'opacity 0.1s ease-out, transform 0.1s ease-out',
                  }}
                >
                  {section.label}
                </h2>
              )}
            </section>
          );
        })}
      </div>

      {/* ナビゲーションインジケーター */}
      <div className="fixed bottom-8 left-0 right-0 flex justify-center gap-2 z-20">
        {sections.map((section, index) => {
          const isActive = index === activeIndex ||
            (index === targetIndex && progress > 0.5);

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={`w-3 h-3 rounded-full ${isActive ? 'bg-white' : 'bg-white/50'}`}
              aria-label={`Go to ${section.label} section`}
            ></a>
          );
        })}
      </div>
    </div>
  );
}
