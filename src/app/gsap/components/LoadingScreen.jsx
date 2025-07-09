"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { zIndexes, layout } from "../styles";

/**
 * ローディング画面コンポーネント
 * @param {Object} props
 * @param {boolean} props.loading - ローディング中かどうか
 * @param {boolean} props.animationsReady - アニメーションの準備ができているかどうか
 */
const LoadingScreen = ({ loading, animationsReady }) => {
  const logoRef = useRef(null);

  // ロゴの回転アニメーション
  useEffect(() => {
    if (!logoRef.current || (!loading && animationsReady)) return;

    // 無限回転アニメーション
    const rotationAnimation = gsap.to(logoRef.current, {
      rotation: 360,
      duration: 2,
      repeat: -1, // 無限繰り返し
      ease: "linear",
      transformOrigin: "center center",
    });

    // クリーンアップ
    return () => {
      rotationAnimation.kill();
    };
  }, [loading, animationsReady]);

  if (!loading && animationsReady) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: layout.fullViewport.width,
        height: layout.fullViewport.height,
        backgroundColor: "white",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: zIndexes.loading,
      }}
    >
      {/* 回転するロゴ */}
      <div
        ref={logoRef}
        style={{
          width: "100px",
          height: "100px",
          marginBottom: "1.5rem",
          position: "relative",
        }}
      >
        <Image
          src="/images/logo-circle.png"
          alt="SOY-POY Logo"
          fill
          sizes="100px"
          style={{ objectFit: "contain" }}
          priority
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
