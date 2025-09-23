import Image from "next/image";
import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";
import HeroSecBottomFrame from "./HeroSecBottomFrame";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden hero-section">
      {/* {TODO: 動画に差し替える} */}
      <Image
        src="/images/top_demo.jpg"
        alt="Hero Section Background"
        fill
        className="object-cover z-0"
        priority
      />
      <HeroSectionTopFrame className="absolute top-1 left-0 w-full pointer-events-none z-10" />
      <HeroSecBottomFrame
        className="absolute bottom-2 z-10 left-0 w-full
        md:left-1/2 md:-translate-x-1/2 md:w-7/10"
      />
    </section>
  );
}
