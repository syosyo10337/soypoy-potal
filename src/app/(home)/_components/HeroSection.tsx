import Image from "next/image";
import HeroSectionTopFrame from "@/assets/HeroSectionTopFrame.svg";

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen max-w-full overflow-x-hidden overflow-y-hidden hero-section-container">
      <div className="w-full h-full overflow-hidden flex items-start justify-center">
        <HeroSectionTopFrame />
        <Image
          src="/images/top_demo.jpg"
          alt="Hero Section Top Movie"
          fill
          className="object-cover"
          priority
        />
      </div>
      {/* Catchphrase */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center z-10">
        <h2 className="text-white font-bold leading-tight hero-title">
          好きに生きて、一緒に生きる
        </h2>
        <p className="text-white/80 mt-2 hero-subtitle">ABOUT SOY-POY</p>
      </div>
    </section>
  );
}
