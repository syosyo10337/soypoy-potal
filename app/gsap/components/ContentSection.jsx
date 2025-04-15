"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { breakpoints, animations, typography, spacing, effects, layout } from "../styles";

/**
 * コンテンツセクションコンポーネント
 * @param {Object} props
 * @param {string} props.title - セクションのタイトル
 * @param {string} props.text - セクションのテキスト
 * @param {string} props.img - 画像のURL
 * @param {string} props.textColor - テキストの色
 * @param {number} props.opacity - 不透明度
 * @param {boolean} props.isActive - アクティブ状態かどうか
 */
const ContentSection = ({ title, text, img, textColor, opacity, isActive }) => {
  const contentRef = useRef(null);
  
  // コンテンツのアニメーション
  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;
    
    // コンテンツ要素
    const content = contentRef.current;
    const contentElements = content.querySelectorAll('h1, p, div[data-image]');
    
    // 初期状態を設定
    gsap.set(contentElements, { opacity: 0, y: 30 });
    
    // アニメーションが準備完了している場合のみ実行
    if (isActive && opacity > 0.8) {
      // モバイルではアニメーションを軽量化
      const isMobile = window.innerWidth < breakpoints.mobile;
      const duration = isMobile ? animations.duration.mobile : animations.duration.default;
      const staggerTime = isMobile ? animations.stagger.mobile : animations.stagger.default;
      
      gsap.to(contentElements, {
        opacity: 1,
        y: 0,
        duration,
        stagger: staggerTime,
        ease: animations.ease.default,
        delay: animations.delay.circleTransition // 円形トランジションが完了するのを待つ
      });
    } else {
      // 非アクティブになったらリセット
      gsap.set(contentElements, { opacity: 0, y: 30 });
    }
  }, [isActive, opacity]);
  
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: layout.fullViewport.width,
        height: layout.fullViewport.height,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start", // 上揃えに変更してスクロールを可能に
        padding: spacing.container,
        textAlign: "center",
        zIndex: 1010,
        color: textColor,
        opacity,
        overflowY: "auto", // スクロールを可能に
        backgroundColor: "transparent",
        pointerEvents: opacity > 0.5 ? "auto" : "none", // 非表示時はポインターイベントを無効化
      }}
      aria-hidden={opacity <= 0.5 ? "true" : "false"} // アクセシビリティのため
    >
      <div 
        ref={contentRef} 
        style={{ 
          maxWidth: spacing.contentMaxWidth, 
          paddingTop: spacing.contentPadding.top, 
          paddingBottom: spacing.contentPadding.bottom 
        }}
      >
        <h1 style={typography.heading}>{title}</h1>
        <p
          style={{
            ...typography.body,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </p>
        <div data-image style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '2rem' }}>
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            style={{
              objectFit: 'cover',
              borderRadius: effects.borderRadius,
              boxShadow: effects.boxShadow,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ContentSection;
