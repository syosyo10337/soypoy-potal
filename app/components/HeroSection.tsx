"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

// スタイルのインポート
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/autoplay";

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  // hydrationエラー対策のため、マウント後にコンポーネントを表示
  useEffect(() => {
    setMounted(true);
  }, []);

  // 表示する画像のリスト
  const images = [
    {
      id: "img1015",
      src: "https://picsum.photos/id/1015/1920/1080",
      alt: "自然の風景",
    },
    {
      id: "img1018",
      src: "https://picsum.photos/id/1018/1920/1080",
      alt: "山の風景",
    },
    {
      id: "img1028",
      src: "https://picsum.photos/id/1028/1920/1080",
      alt: "森の風景",
    },
    {
      id: "img1039",
      src: "https://picsum.photos/id/1039/1920/1080",
      alt: "湖の風景",
    },
  ];

  if (!mounted) return null;

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={1500}
        className="absolute inset-0 w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image.id} className="relative w-full h-full">
            <div className="absolute inset-0 bg-black/50 z-10" />
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={image.id === "img1015"}
              className="object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* テキストオーバーレイ */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pt-16">
        <div className="text-center max-w-4xl mx-auto px-4">
          <h1 className="text-white text-2xl sm:text-4xl md:text-4xl lg:text-6xl xl:text-6xl font-bold mb-4 tracking-wider font-zen-old-mincho">
            好きに生きて、一緒に生きる
          </h1>
        </div>
      </div>
    </section>
  );
}
