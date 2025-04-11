"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Swiperのスタイルをインポート
import "swiper/css";
import "swiper/css/autoplay";

type AboutSectionProps = {
  onArrowClick?: () => void;
};

export default function AboutSection({ onArrowClick }: AboutSectionProps) {
  // 画像のリスト
  const images = [
    {
      id: 1,
      src: "https://picsum.photos/id/42/1200/800",
      alt: "SOY-POYの様子1",
      title: "音楽との出会い",
    },
    {
      id: 2,
      src: "https://picsum.photos/id/54/1200/800",
      alt: "SOY-POYの様子2",
      title: "特別な空間",
    },
    {
      id: 3,
      src: "https://picsum.photos/id/110/1200/800",
      alt: "SOY-POYの様子3",
      title: "アートと交流",
    },
    {
      id: 4,
      src: "https://picsum.photos/id/225/1200/800",
      alt: "SOY-POYの様子4",
      title: "ライブパフォーマンス",
    },
    {
      id: 5,
      src: "https://picsum.photos/id/338/1200/800",
      alt: "SOY-POYの様子5",
      title: "新しい出会い",
    },
  ];

  return (
    <SectionWrapper
      className="bg-[#1E88E5] text-white relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
      }}
      showArrow
      onArrowClick={onArrowClick}
    >
      {/* 装飾的な背景要素 - アニメーションなし */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-400 opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#00c896] opacity-5 blur-3xl" />

      {/* タイトル */}
      <div className="mb-10 relative z-10">
        <h2 className="text-5xl font-bold mb-2 text-center tracking-tight">
          About
        </h2>
        <div className="w-24 h-1 bg-[#00c896] mx-auto mt-4" />
      </div>

      {/* カルーセル - 新デザイン */}
      <div className="w-full max-w-6xl px-4 mb-12 relative z-10">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={2}
          speed={5000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
          loop={true}
          className="w-full py-8 overflow-visible"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} className="swiper-slide-blur-effect">
              <div className="relative h-[300px] overflow-hidden rounded-xl transition-all duration-500 hover:shadow-lg">
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={1200}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  priority={image.id === 1}
                  loading={image.id === 1 ? "eager" : "lazy"}
                  quality={85}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* カルーセルの端をぼかすスタイル */}
        <style jsx global>{`
            .swiper-wrapper {
              transition-timing-function: linear !important;
            }
            .swiper-slide {
              transition: all 0.3s ease;
              opacity: 0.8;
              filter: blur(1px);
            }
            .swiper-slide-active {
              opacity: 1;
              filter: blur(0);
              transform: scale(1.05);
            }
            .swiper-slide-prev, .swiper-slide-next {
              opacity: 0.9;
              filter: blur(0.5px);
            }
          `}</style>
      </div>

      {/* テキストコンテンツ */}
      <div className="text-center max-w-3xl px-6 mb-8 relative z-10">
        <p className="text-xl text-white leading-relaxed mb-10">
          <span className="text-[#FFF8E1] font-semibold">SOY-POY</span>
          はただのバーではありません。人々が集い、つながり、経験を共有する
          <span className="text-[#FFF8E1] font-semibold">
            コミュニティスペース
          </span>
          です。 私たちは
          <span className="text-[#FFF8E1] font-semibold">音楽</span>、
          <span className="text-[#FFF8E1] font-semibold">アート</span>、そして
          <span className="text-[#FFF8E1] font-semibold">人々の交流</span>
          を通じて、特別な場所を創り出しています。
        </p>
        <button
          type="button"
          className="relative overflow-hidden group bg-[#00c896] hover:bg-transparent text-black font-bold py-3 px-10 rounded-full transition-all duration-300 border-2 border-[#00c896]"
        >
          <span className="relative z-10 group-hover:text-[#00c896] transition-colors duration-300">
            もっと知る
          </span>
        </button>
      </div>
    </SectionWrapper>
  );
}
