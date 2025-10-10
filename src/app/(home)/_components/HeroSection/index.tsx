import { Suspense } from "react";
import ArchDecoration from "./ArchDecoration";
import HeroSecBottomFrame from "./TagLine";
import { VideoComponent } from "./VideoComponent";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] md:h-[110vh] z-10 overflow-x-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <VideoComponent />
      </Suspense>
      <ArchDecoration className="absolute pt-2 px-2 w-full h-full pointer-events-none z-10" />
      <HeroSecBottomFrame
        className="absolute bottom-0 md:bottom-36 z-10 w-full px-8
        md:left-1/2 md:-translate-x-1/2 md:w-7/10 md:px-0"
      />
    </section>
  );
}
