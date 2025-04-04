"use client";

import Image from "next/image";
import Button from "./Button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景画像 */}
      <div className="absolute inset-0 z-0 bg-black">
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

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <h1 className="text-white text-6xl md:text-8xl font-bold mb-4 tracking-wider">
          SOY-POY
        </h1>
        <h2 className="text-white text-xl md:text-3xl font-medium mb-12 tracking-widest">
          COMMUNITY BAR
        </h2>
        <Button href="/about" className="text-lg tracking-wide">LEARN MORE</Button>
      </div>
    </div>
  );
}
