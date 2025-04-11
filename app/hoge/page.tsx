"use client";

import { useEffect, useState, ReactNode, CSSProperties } from "react";
import { ChevronDown } from "lucide-react";

const baseStyle: CSSProperties = {
  position: "relative",
  width: "100%",
  minHeight: "100vh",
  padding: "4rem 2rem",
  fontSize: "1.25rem",
  boxSizing: "border-box",
  overflowY: "auto",
  scrollPaddingBottom: "10vh",
};

type SectionProps = {
  className?: string;
  style?: CSSProperties;
  showArrow?: boolean;
  onArrowClick?: () => void;
  children: ReactNode;
};

function SectionWrapper({ className, style, showArrow, onArrowClick, children }: SectionProps) {
  return (
    <div className={className} style={{ ...baseStyle, ...style }}>
      {children}
      {showArrow && onArrowClick && (
        <button onClick={onArrowClick} className="mt-10 animate-bounce flex justify-center w-full">
          <ChevronDown className="w-10 h-10 text-gray-500" />
        </button>
      )}
    </div>
  );
}

const createSection = (content: ReactNode, className: string, style: CSSProperties = {}) =>
  ({ onArrowClick }: { onArrowClick?: () => void }) => (
    <SectionWrapper className={className} style={style} showArrow onArrowClick={onArrowClick}>
      {content}
    </SectionWrapper>
  );

const HeroSection = createSection(
  <>
    <h1 className="text-4xl">Welcome to Our Site</h1>
    <img src="https://picsum.photos/seed/hero/800/400" alt="hero" className="rounded-xl" />
    <p className="max-w-2xl">
      Discover the essence of creativity and inspiration in our digital showcase. Explore ideas, people, and innovations that redefine possibility.
    </p>
    <p className="max-w-2xl">
      {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(20)}
    </p>
  </>,
  "bg-yellow-100",
  { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", gap: "1.5rem" }
);

const AboutSection = createSection(
  <>
    <div>
      <h1 className="text-4xl mb-4">About Us</h1>
      <p>
        We are passionate creators and developers building experiences that resonate. Our team works at the intersection of design and technology.
      </p>
      <p>
        {"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium. ".repeat(10)}
      </p>
    </div>
    <img src="https://picsum.photos/seed/about/500/600" alt="about" className="rounded-xl w-full h-auto" />
  </>,
  "bg-blue-500 text-white",
  { display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "2rem" }
);

const EventSection = createSection(
  <>
    <img src="https://picsum.photos/seed/event/500/700" alt="event" className="rounded-xl" />
    <div className="flex-1">
      <h1 className="text-4xl mb-4">Upcoming Events</h1>
      <p>
        Join us for our upcoming workshops, webinars, and community events. Learn from experts and connect with peers.
      </p>
      <p>
        {"Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam. ".repeat(12)}
      </p>
    </div>
  </>,
  "bg-orange-400",
  { display: "flex", flexDirection: "row", gap: "2rem" }
);

const AccessSection = createSection(
  <>
    <h1 className="text-4xl">Access & Location</h1>
    <img src="https://picsum.photos/seed/access/800/400" alt="access" className="rounded-xl" />
    <p className="max-w-3xl">
      Find us in the heart of the city, where creativity meets community. Easy to access by public transport or car.
    </p>
    <p className="max-w-3xl">
      {"Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat. ".repeat(10)}
    </p>
  </>,
  "bg-green-700 text-white",
  { display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "center", gap: "1.5rem" }
);

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
              className={`rounded-full transition-colors duration-200 ${i === index ? "bg-black w-3 h-3" : "bg-gray-400 w-2 h-2"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
