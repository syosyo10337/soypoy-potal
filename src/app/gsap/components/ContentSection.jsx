"use client";

import { gsap } from "gsap";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { effects, layout, spacing, typography } from "../styles";

/**
 * コンテンツセクションコンポーネント
 * @param {Object} props
 * @param {string} props.title - セクションのタイトル
 * @param {string} props.text - セクションのテキスト
 * @param {string} props.img - 画像のURL
 * @param {string} props.textColor - テキストの色
 * @param {number} props.opacity - 不透明度
 * @param {boolean} props.isActive - アクティブ状態かどうか
 * @param {Object} props.sectionState - セクションの状態情報
 * @param {number} props.index - セクションのインデックス
 */
const ContentSection = ({
  title,
  text,
  img,
  textColor,
  opacity,
  isActive,
  sectionState,
  index,
}) => {
  const contentRef = useRef(null);

  // コンテンツの表示制御
  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;

    // コンテンツ要素
    const content = contentRef.current;
    const contentElements = content.querySelectorAll("h1, p, div[data-image]");

    // アニメーション進行度とセクション状態に基づいて表示制御
    const shouldShow =
      // アクティブで不透明度が高い
      (isActive && opacity > 0.8) ||
      // またはアニメーション進行度が70%以上
      sectionState?.contentVisibility === true ||
      // またはアニメーション完了状態
      sectionState?.animationComplete === index;

    if (shouldShow) {
      gsap.set(contentElements, { opacity: 1, y: 0 });
    } else {
      // 非表示条件の場合
      gsap.set(contentElements, { opacity: 0, y: 0 });
    }
  }, [isActive, opacity, sectionState, index]);

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
          paddingBottom: spacing.contentPadding.bottom,
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
        <div
          data-image
          style={{
            position: "relative",
            width: "100%",
            height: "400px",
            marginBottom: "2rem",
          }}
        >
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            style={{
              objectFit: "cover",
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
