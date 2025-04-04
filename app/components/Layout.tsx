"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
  fullWidth?: boolean; // 画面幅いっぱいに表示するかどうか
};

export default function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* 共通の背景画像 */}
      <div className="fixed inset-0 z-0 bg-black">
        <Image
          src="/background.png"
          alt="抽象的なブラシストロークの背景"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.9,
            mixBlendMode: "screen"
          }}
        />
      </div>

      <Header />
      <main className={`flex-grow z-10 relative ${fullWidth ? '' : 'pt-24 px-6 pb-16'}`}>{children}</main>
      <Footer />
    </div>
  );
}
