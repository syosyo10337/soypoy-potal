"use client";

import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import EventSection from "./components/EventSection";
import AccessSection from "./components/AccessSection";

// セクションコンポーネントの配列
const sectionComponents = [HeroSection, AboutSection, EventSection, AccessSection];

export default function Page() {
  const [radius, setRadius] = useState(0);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const height = window.visualViewport?.height ?? window.innerHeight;
    const handleScroll = () => {
      const scroll = window.scrollY;
      const i = Math.round(scroll / height);
      setIndex(Math.min(i, sectionComponents.length - 1));
      setRadius(((scroll - i * height) / height) * 150);
    };

    window.addEventListener("scroll", handleScroll);
    window.visualViewport?.addEventListener("resize", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.visualViewport?.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (i: number) => {
    const height = window.visualViewport?.height ?? window.innerHeight;
    window.scrollTo({ top: height * i, behavior: "smooth" });
  };

  const CurrentComponent = sectionComponents[index];
  const NextComponent = sectionComponents[index + 1];
  const showNext = radius > 0 && NextComponent;

  return (
    <div style={{ height: `${sectionComponents.length * 100}vh` }}>
      <div className="sticky top-0 w-full h-screen">
        <div className="absolute inset-0 z-0 overflow-auto">
          <CurrentComponent onArrowClick={() => scrollToSection(index + 1)} />
        </div>

        {showNext && (
          <div
            className="absolute inset-0 z-10 overflow-auto"
            style={{
              WebkitClipPath: `circle(${radius}% at center)`,
              clipPath: `circle(${radius}% at center)`,
              willChange: "clip-path",
            }}
          >
            <NextComponent onArrowClick={() => scrollToSection(index + 2)} />
          </div>
        )}

        <div className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {sectionComponents.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-colors duration-200 cursor-pointer ${i === index ? "bg-[#00c896] w-3 h-3" : "bg-gray-400 w-2 h-2"}`}
              onClick={() => scrollToSection(i)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
