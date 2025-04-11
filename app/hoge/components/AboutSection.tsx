"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type AboutSectionProps = {
  onArrowClick?: () => void;
};

export default function AboutSection({ onArrowClick }: AboutSectionProps) {
  // 画像のリスト
  const images = [
    { id: 1, src: "https://picsum.photos/id/42/600/400", alt: "SOY-POYの様子1" },
    { id: 2, src: "https://picsum.photos/id/54/600/400", alt: "SOY-POYの様子2" },
    { id: 3, src: "https://picsum.photos/id/110/600/400", alt: "SOY-POYの様子3" },
    { id: 4, src: "https://picsum.photos/id/225/600/400", alt: "SOY-POYの様子4" },
    { id: 5, src: "https://picsum.photos/id/338/600/400", alt: "SOY-POYの様子5" },
  ];

  return (
    <SectionWrapper
      className="bg-[#1E88E5] text-white"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem"
      }}
      showArrow
      onArrowClick={onArrowClick}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">About SOY-POY</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {images.slice(0, 3).map((image) => (
          <div
            key={image.id}
            className="relative h-64 w-full overflow-hidden rounded-lg transform transition-transform duration-500 hover:scale-105"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <div className="text-center max-w-3xl">
        <p className="text-xl mb-8">
          SOY-POYはただのバーではありません。人々が集い、つながり、経験を共有するコミュニティスペースです。
          私たちは音楽、アート、そして人々の交流を通じて、特別な場所を創り出しています。
        </p>
        <button className="bg-[#00c896] hover:bg-[#00a57d] text-black font-bold py-3 px-8 rounded-full transition-colors duration-300">
          もっと知る
        </button>
      </div>
    </SectionWrapper>
  );
}
