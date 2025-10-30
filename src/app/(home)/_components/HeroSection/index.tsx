import { Suspense } from "react";
import { cn } from "@/utils/cn";
import ArchDecoration from "./ArchDecoration";
import RibonDescription from "./RibonDescription";
import VideoComponent from "./VideoComponent";

export default function HeroSection() {
  return (
    <section
      id="hero-section"
      className="relative w-full z-10 overflow-x-hidden"
    >
      <div
        className={cn(
          "relative w-full",
          "aspect-smartphone",
          "sm:aspect-retro",
          "lg:aspect-video",
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <VideoComponent />
        </Suspense>
        <ArchDecoration className="absolute inset-0 pt-2 px-2 pointer-events-none z-20" />
      </div>
      {/* RibonDescription を通常フローに出し、負マージンで下辺へ食い込ませる */}
      <RibonDescription
        className={cn(
          "relative z-10 w-full mx-auto",
          "-mt-[clamp(78px,24vw,160px)]",
          "sm:-mt-[clamp(140px,20vw,180px)]",
          "lg:-mt-[clamp(160px,16vw,220px)]",
          "2xl:-mt-[clamp(180px,12vw,280px)]",
        )}
      />

      {/* 下方向の余白で下のコンテンツとの被りを回避 */}
      <div
        className={cn("h-[10vh] sm:h-[6vh] lg:h-[5vh]")}
        aria-hidden="true"
      />
    </section>
  );
}
