"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { ChevronDown } from "lucide-react";

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
        gap: "1.5rem",
        position: "relative"
      }}
      showArrow={false}
      onArrowClick={onArrowClick}
    >
      <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-square flex items-center justify-center px-4">
        <Image
          src="/logo.png"
          alt="SOY-POY Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
      

      {onArrowClick && (
        <button
          onClick={onArrowClick}
          className="absolute bottom-10 animate-bounce flex justify-center w-full"
        >
          <ChevronDown className="w-10 h-10 text-gray-500" />
        </button>
      )}
    </SectionWrapper>
  );
}
