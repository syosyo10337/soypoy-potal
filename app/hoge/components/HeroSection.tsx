"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type HeroSectionProps = {
  onArrowClick?: () => void;
};

export default function HeroSection({ onArrowClick }: HeroSectionProps) {
  return (
    <SectionWrapper
      className="bg-[#FFF8E1] text-black"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "2rem"
      }}
      showArrow
      onArrowClick={onArrowClick}
    >
      <div className="relative w-64 h-64 md:w-200 md:h-200 mb-8">
        <Image
          src="/logo.png"
          alt="SOY-POY Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="text-xl md:text-2xl max-w-2xl opacity-80">
        好きに生きて、一緒に生きる
      </p>
    </SectionWrapper>
  );
}
