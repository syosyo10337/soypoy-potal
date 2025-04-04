"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
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
      <main className="flex-grow z-10 relative pt-24 px-6 pb-16">{children}</main>
      <Footer />
    </div>
  );
}
