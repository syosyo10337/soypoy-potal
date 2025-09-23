import { Suspense } from "react";
import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";
import HeroSecBottomFrame from "./HeroSecBottomFrame";
import VideoComponent from "./VideoComponent";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[80vh] overflow-hidden hero-section">
      <Suspense fallback={<div>Loading...</div>}>
        <VideoComponent />
      </Suspense>
      <HeroSectionTopFrame className="absolute top-1 left-0 w-full pointer-events-none z-10" />
      <HeroSecBottomFrame
        className="absolute bottom-2 z-10 left-0 w-full
        md:left-1/2 md:-translate-x-1/2 md:w-7/10"
      />
    </section>
  );
}
