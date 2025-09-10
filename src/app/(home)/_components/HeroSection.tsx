import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.optimized.svg";
import HeroSecBottomFrame from "@/assets/HeroSecBottomFrame.optimized.svg";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden hero-section">
      {/* 背景画像 */}
      <Image
        src="/images/top_demo.jpg"
        alt="Hero Section Background"
        fill
        className="object-cover z-0"
        priority
      />
      
      <HeroSectionTopFrame className="absolute top-0 left-0 w-full pointer-events-none z-10" />
      <HeroSecBottomFrame className="absolute bottom-0 left-0 w-full pointer-events-none z-10" />
    </section>
  );
}
