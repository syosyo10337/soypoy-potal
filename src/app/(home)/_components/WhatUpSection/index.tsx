import Image from "next/image";
import WhatUpButton from "./WhatUpButton";

export default function WhatUpSection() {
  return (
    <section className="relative w-full max-w-[80vw] mx-auto py-8 md:py-12 lg:py-16 z-30">
      <div className="relative w-full h-5 mb-1">
        <Image
          src="/images/whatup/what_up_line.png"
          alt="Cover line"
          fill
          className="object-fit"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2">
        <div className="grid grid-rows-[1fr_2fr] gap-2">
          <WhatUpButton prefix="shop" title="Artworks" />
          <div className="relative">
            <Image
              src="/images/whatup/record.png"
              alt="Artworks"
              fill
              className="object-fit"
              sizes="(max-width: 768px) 90vw, 30vw"
            />
          </div>
        </div>

        <div className="grid grid-rows-[2fr_1fr] gap-2">
          <div className="relative">
            <Image
              src="/images/whatup/bar.png"
              alt="Bar"
              fill
              className="object-fit"
              sizes="(max-width: 768px) 90vw, 30vw"
            />
          </div>
          <WhatUpButton prefix="marebito" title="Radio" />
        </div>

        <div className="grid grid-rows-[1fr_2fr] gap-2">
          <WhatUpButton prefix="youtube" title="Channel" />
          <div className="relative">
            <Image
              src="/images/whatup/lighter.png"
              alt="Lighter"
              fill
              className="object-fit"
              sizes="(max-width: 768px) 90vw, 30vw"
            />
          </div>
        </div>
      </div>

      <div className="relative w-full h-5 mt-1">
        <Image
          src="/images/whatup/what_up_line.png"
          alt="Cover line bottom"
          fill
          className="object-fit scale-[-1]"
        />
      </div>
    </section>
  );
}
