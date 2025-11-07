import HeroSection from "./_components/HeroSection";
import PickUpSection from "./_components/PIckUpSection";
import WhatUpSection from "./_components/WhatUpSection";

export default function Page() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <PickUpSection />
      <WhatUpSection />
    </div>
  );
}
