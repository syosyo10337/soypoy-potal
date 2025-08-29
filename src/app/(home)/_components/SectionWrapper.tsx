"use client";

import { ChevronDown } from "lucide-react";
import {
  type CSSProperties,
  type ForwardedRef,
  forwardRef,
  memo,
  type ReactNode,
} from "react";

// ベーススタイル定義
export const baseStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  height: "auto", // 高さをautoに設定してコンテンツに合わせる
  padding: "4rem 2rem",
  fontSize: "1.25rem",
  boxSizing: "border-box",
  overflowY: "auto", // 縦スクロールを可能に
  overflowX: "hidden", // 横スクロールは無効化
  scrollPaddingBottom: "10vh",
  // パフォーマンス最適化
  willChange: "transform",
  transform: "translateZ(0)", // GPUアクセラレーション
};

// セクションのプロパティ型定義
export type SectionProps = {
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  onArrowClick?: () => void;
  children: ReactNode;
};

// セクションラッパーコンポーネント
const SectionWrapper = memo(
  forwardRef(function SectionWrapper(
    { className, style, showArrow, onArrowClick, children }: SectionProps,
    ref: ForwardedRef<HTMLDivElement>,
  ) {
    return (
      <div ref={ref} className={className} style={{ ...baseStyle, ...style }}>
        {children}
        {showArrow && onArrowClick && (
          <button
            type="button"
            onClick={onArrowClick}
            className="mt-10 animate-bounce flex justify-center w-full"
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-10 h-10 text-gray-500" />
          </button>
        )}
      </div>
    );
  }),
);

export default SectionWrapper;
