"use client";

import Image from "next/image";
import ScrollToSection from "./ScrollToSection";

export default function AboutSection() {
  // 画像のリスト
  const images = [
    {
      id: 1,
      src: "https://picsum.photos/id/42/600/400",
      alt: "SOY-POYの様子1",
    },
    {
      id: 2,
      src: "https://picsum.photos/id/54/600/400",
      alt: "SOY-POYの様子2",
    },
    {
      id: 3,
      src: "https://picsum.photos/id/110/600/400",
      alt: "SOY-POYの様子3",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/225/600/400",
      alt: "SOY-POYの様子4",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/338/600/400",
      alt: "SOY-POYの様子5",
    },
    // 無限スクロール用に同じ画像を繰り返し
    {
      id: 6,
      src: "https://picsum.photos/id/42/600/400",
      alt: "SOY-POYの様子1",
    },
    {
      id: 7,
      src: "https://picsum.photos/id/54/600/400",
      alt: "SOY-POYの様子2",
    },
    {
      id: 8,
      src: "https://picsum.photos/id/110/600/400",
      alt: "SOY-POYの様子3",
    },
    {
      id: 9,
      src: "https://picsum.photos/id/225/600/400",
      alt: "SOY-POYの様子4",
    },
    {
      id: 10,
      src: "https://picsum.photos/id/338/600/400",
      alt: "SOY-POYの様子5",
    },
  ];

  return (
    <section
      id="about"
      className="section-full-height flex items-center justify-center relative"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-6">About SOY-POY</h2>
        </div>

        <div className="overflow-hidden">
          {/* 画像の横スクロール */}
          <div className="image-scroll no-scrollbar">
            {images.map((image) => (
              <div
                key={image.id}
                className="inline-block w-[300px] h-[200px] mx-2 relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* メッセージとボタン */}
        <div className="text-center mt-12">
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            SOY-POYはただのバーではありません。人々が集い、つながり、経験を共有するコミュニティスペースです。
            私たちは音楽、アート、そして人々の交流を通じて、特別な場所を創り出しています。
          </p>
          <a
            href="/about"
            className="inline-block bg-[#00c896] hover:bg-[#00a57d] text-black font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            もっと知る
          </a>
        </div>
      </div>

      {/* スクロール矢印 */}
      <ScrollToSection
        targetId="access"
        className="scroll-arrow z-30"
        duration={1000}
        offset={80}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </ScrollToSection>
    </section>
  );
}
