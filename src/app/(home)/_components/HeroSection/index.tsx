import { Suspense } from "react";
import { cn } from "@/utils/cn";
import ArchDecoration from "./ArchDecoration";
import RibonDescription from "./RibonDescription";
import VideoComponent from "./VideoComponent";

export default function HeroSection() {
  return (
    <section className="relative w-full z-10 overflow-x-hidden">
      {/* NOTE:VideoComponentとRibonDescriptionを同じコンテナに配置 */}
      {/* NOTE:aspect-ratioでVideoの高さが決まり、RibonDescriptionはその高さに対する相対位置で配置される */}
      <div
        id="hero-section"
        className={cn(
          "relative w-full",
          "h-screen md:h-auto",  // SP: カーブまでが100vhになる高さ
          "md:aspect-retro lg:aspect-video",
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <VideoComponent />
        </Suspense>
        <ArchDecoration className="absolute pt-2 px-2 w-full h-full pointer-events-none z-10" />
        <RibonDescription
          className={cn(
            "absolute z-10 md:left-1/2 md:-translate-x-1/2",
            "top-[87vh]", //TODO:調整する
            "md:top-[72%] md:bottom-auto ",
            "lg:top-[70%]",
            "xl:top-[74%]",
          )}
        />
      </div>
      {/* NOTE: RibonDescriptionが見切れないように下部に余白を確保 */}
      <div
        className={cn(
          "md:h-[42vh]",
          "lg:h-[29vh]",
          "xl:h-[31vh]",
        )}
        aria-hidden="true"
      />
    </section>
  );
}
