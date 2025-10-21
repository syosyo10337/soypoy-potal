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
        className={cn(
          "relative w-full",
          "aspect-smartphone md:aspect-retro lg:aspect-video",
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <VideoComponent />
        </Suspense>
        <ArchDecoration className="absolute pt-2 px-2 w-full h-full pointer-events-none z-10" />
        <RibonDescription
          className={cn(
            "absolute z-10 md:left-1/2 md:-translate-x-1/2",
            // TODO: SP: Videoコンテナの下端から下に配置（一旦シンプルに）
            "bottom-[-60%] left-0 right-0",
            // NOTE: tablet/pc: Videoの高さに対する割合で配置（下端からの相対位置を維持）
            "md:top-[72%] md:bottom-auto ",
            "lg:top-[70%]",
            "xl:top-[74%]",
          )}
        />
      </div>
      {/* NOTE: RibonDescriptionを見切れないように下部に余白を確保 */}
      <div
        className={cn(
          "h-[60vh]", //TODO:  SP: bottom-[-60%]に合わせて調整 一旦
          "md:h-[44vh]",
          "lg:h-[29vh]",
          "xl:h-[31vh]",
        )}
        aria-hidden="true"
      />
    </section>
  );
}
