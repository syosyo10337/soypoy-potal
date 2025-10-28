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
      {/* VideoLayer: VideoとArchを重ねる */}
      <div
        className={cn(
          "relative w-full",
          "h-[60vh]",
          "md:aspect-retro lg:aspect-video",
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <VideoComponent />
        </Suspense>
        <ArchDecoration className="absolute inset-0 pt-2 px-2 pointer-events-none z-20" />
        <RibonDescription
          className={cn(
            "absolute z-10 md:left-1/2 md:-translate-x-1/2",
            "top-[50vh]",
            "md:top-[72%]",
            "lg:top-[70%]",
            "xl:top-[74%]",
          )}
        />
      </div>
      {/* NOTE: RibonDescriptionが見切れないように下部に余白を確保 */}
      <div
        className={cn("h-[150vh]", "md:h-[42vh]", "lg:h-[29vh]", "xl:h-[31vh]")}
        aria-hidden="true"
      />
    </section>
  );
}
