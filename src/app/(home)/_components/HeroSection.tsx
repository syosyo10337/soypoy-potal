"use client";

import Image from "next/image";
import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";

export default function HeroSection() {
  return (
    <div className="relative w-full overflow-hidden hero-section-container">
      {/* Background SVG Frame */}
      <div className="absolute inset-0 w-full h-full">
        <HeroSectionTopFrame className="w-full h-full object-cover" />
      </div>

      {/* Main Logo */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative hero-logo-container">
          <Image
            src="/logo.png"
            alt="SOY-POY Logo"
            fill
            className="object-contain"
            priority
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 60vw, 600px"
            quality={95}
          />
        </div>
      </div>

      {/* Catchphrase */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-white font-bold leading-tight hero-title">
          好きに生きて、一緒に生きる
        </h2>
        <p className="text-white/80 mt-2 hero-subtitle">ABOUT SOY-POY</p>
      </div>
    </div>
  );
}
