"use client";

import { ReactNode, CSSProperties, memo } from "react";
import { ChevronDown } from "lucide-react";

// ベーススタイル定義
export const baseStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "4rem 2rem",
  fontSize: "1.25rem",
  boxSizing: "border-box",
  overflowY: "auto",
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
const SectionWrapper = memo(function SectionWrapper({ 
  className, 
  style, 
  showArrow, 
  onArrowClick, 
  children 
}: SectionProps) {
  return (
    <div 
      className={className} 
      style={{ ...baseStyle, ...style }}
    >
      {children}
      {showArrow && onArrowClick && (
        <button 
          onClick={onArrowClick} 
          className="mt-10 animate-bounce flex justify-center w-full"
          aria-label="Scroll to next section"
        >
          <ChevronDown className="w-10 h-10 text-gray-500" />
        </button>
      )}
    </div>
  );
});

export default SectionWrapper;
