import { Suspense } from "react";
import { cn } from "@/utils/cn";
import ArchDecoration from "./ArchDecoration";
import RibonDescription from "./RibonDescription";
import VideoComponent from "./VideoComponent";

export default function HeroSection() {
  return (
    <section
      className={cn(
        "relative w-full z-10 overflow-x-hidden",
        "h-[140vh] md:h-[120vh]",
      )}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <VideoComponent />
      </Suspense>
      <ArchDecoration className="absolute pt-2 px-2 w-full h-full pointer-events-none z-10" />
      <RibonDescription
        className={cn(
          "absolute z-10 md:left-1/2 md:-translate-x-1/2",
          "bottom-[10vh] md:bottom-[30vh] lg:bottom-[40vh] xl:bottom-[30vh] 2xl:bottom-[42vh]",
        )}
      />
    </section>
  );
}
