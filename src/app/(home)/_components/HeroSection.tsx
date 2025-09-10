import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.optimized.svg";
import HeroSecBottomFrame from "@/assets/HeroSecBottomFrame.optimized.svg";
import Image from "next/image";
export default function HeroSection() {
  return (
    <section className="hero-section">
      <HeroSectionTopFrame className="w-full pointer-events-none" />
        <Image
          src="/images/top_demo.jpg"
          alt="Hero Section Background"
          width={1000}
          height={1000}
          className="object-cover"
        />
      <h2 className="text-white font-bold leading-tight hero-title">
        好きに生きて、一緒に生きる
      </h2>
      <p className="text-white/80 mt-2 hero-subtitle">ABOUT SOY-POY</p>
      <HeroSecBottomFrame className="w-full pointer-events-none" />
    </section>
  );
}
