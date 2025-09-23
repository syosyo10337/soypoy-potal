import { Suspense } from "react";
import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";
import FudaOverLay from "./FudaOverLay";
import HeroSecBottomFrame from "./HeroSecBottomFrame";
import VideoComponent from "./VideoComponent";

export default function HeroSection() {
  return (
    <section className="relative w-full h-[100vh] md:h-[80vh]">
      <Suspense fallback={<div>Loading...</div>}>
        <VideoComponent />
      </Suspense>
      <FudaOverLay className="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden" />
      <HeroSectionTopFrame className="absolute top-1 left-0 w-full pointer-events-none z-10" />
      <HeroSecBottomFrame
        className="absolute -bottom-50 md:bottom-2 z-10 w-full px-8
        md:left-1/2 md:-translate-x-1/2 md:w-7/10 md:px-0"
      />
    </section>
  );
}
