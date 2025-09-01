"use client";

import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen max-w-full overflow-x-hidden overflow-y-hidden hero-section-container">
      <div className="w-full h-full overflow-hidden flex items-center justify-center">
        <HeroSectionTopFrame className="max-w-full max-h-full object-contain" />
      </div>

      {/* Catchphrase */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center">
        <h2 className="text-white font-bold leading-tight hero-title">
          好きに生きて、一緒に生きる
        </h2>
        <p className="text-white/80 mt-2 hero-subtitle">ABOUT SOY-POY</p>
      </div>
    </section>
  );
}
