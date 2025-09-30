import FudaFilmRollBg from "./_components/FudaFilmRollBg";
import HeroSection from "./_components/HeroSection";
import PickUpSection from "./_components/PIckUpSection";
import WhatUpSection from "./_components/WhatUpSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-soypoy-main">
      <FudaFilmRollBg />
      <HeroSection />
      <PickUpSection />
      <WhatUpSection />
    </div>
  );
}
