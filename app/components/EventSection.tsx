"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { useEffect, useState } from "react";

type EventSectionProps = {
  onArrowClick?: () => void;
};

export default function EventSection({ onArrowClick }: EventSectionProps) {
  // 画面サイズに応じてスタイルを調整するための状態
  const [fontSize, setFontSize] = useState({
    title: 'text-5xl',
    subtitle: 'text-xl',
    description: 'text-base',
  });
  const [imageHeight, setImageHeight] = useState('h-48');
  const [cardPadding, setCardPadding] = useState('p-6');
  const [cardGap, setCardGap] = useState('gap-8');

  // 画面サイズに応じてスタイルを調整する関数
  const adjustStyles = () => {
    const height = window.innerHeight;

    // 画面の高さに応じてフォントサイズを調整
    if (height < 700) {
      setFontSize({
        title: 'text-4xl',
        subtitle: 'text-lg',
        description: 'text-sm',
      });
      setImageHeight('h-32');
      setCardPadding('p-4');
      setCardGap('gap-4');
    } else if (height < 900) {
      setFontSize({
        title: 'text-5xl',
        subtitle: 'text-xl',
        description: 'text-base',
      });
      setImageHeight('h-40');
      setCardPadding('p-5');
      setCardGap('gap-6');
    } else {
      setFontSize({
        title: 'text-5xl',
        subtitle: 'text-xl',
        description: 'text-base',
      });
      setImageHeight('h-48');
      setCardPadding('p-6');
      setCardGap('gap-8');
    }
  };

  // マウント時とリサイズ時にスタイルを調整
  useEffect(() => {
    adjustStyles();
    window.addEventListener('resize', adjustStyles);
    return () => {
      window.removeEventListener('resize', adjustStyles);
    };
  }, []);

  const events = [
    {
      image: "https://picsum.photos/id/1039/800/800", // 正方形の画像に変更
      date: "SAT 2025.5.24-5.25",
      title: "宴2025 鹿炎祭",
      description: "SOY-POY主催による野外オープンマイクイベント「宴2025」を今年も5月24日-25日開催します。",
    },
    {
      image: "https://picsum.photos/id/1025/800/800", // 正方形の画像に変更
      date: "FRI 2025.6.15",
      title: "月見の宴",
      description: "満月の夜に行われる音楽と詩の朗読会。静かな夜に心地よい音楽と言葉が響きます。",
    },
    {
      image: "https://picsum.photos/id/1062/800/800", // 正方形の画像に変更
      date: "SAT 2025.7.20",
      title: "夏祭りライブ",
      description: "真夏の夜に行われる熱いライブイベント。地元アーティストによるパフォーマンスをお楽しみください。",
    },
  ];

  return (
    <SectionWrapper
      className="bg-[#FF9800] text-white relative overflow-hidden"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2rem" // ギャップを少し小さくして高さを調整
      }}
      showArrow
      onArrowClick={onArrowClick}
    >
      {/* 装飾的な背景要素 */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-orange-400 opacity-10 blur-3xl" />
      <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-[#00c896] opacity-5 blur-3xl" />

      {/* タイトル - About セクションと統一感を持たせる */}
      <div className="mb-4 sm:mb-6 relative z-10">
        <h2 className={`${fontSize.title} font-bold mb-2 text-center tracking-tight`}>Events</h2>
        <div className="w-24 h-1 bg-[#00c896] mx-auto mt-2 sm:mt-4" />
      </div>

      <div className={`grid grid-cols-1 md:grid-cols-3 ${cardGap} w-full max-w-6xl px-4 relative z-10`}>
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl border border-white/20"
          >
            <div className={`relative ${imageHeight} w-full`}>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
              {/* 詳細ボタン */}
              <div className="absolute bottom-3 right-3">
                <button
                  className="bg-[#00c896] hover:bg-[#00b085] text-black font-bold px-3 py-1 rounded-full text-xs sm:text-sm transition-all duration-300 shadow-lg"
                  onClick={() => {
                    // TODO: イベント詳細ページにリンクする処理を実装
                    // window.location.href = `/events/${event.id}`
                    console.log(`イベント詳細: ${event.title}`);
                  }}
                >
                  詳細
                </button>
              </div>
            </div>
            <div className={cardPadding}>
              <div className="inline-block bg-[#00c896] text-black px-2 py-1 text-xs sm:text-sm font-bold rounded-full mb-2 sm:mb-3">
                {event.date}
              </div>
              <h3 className={`${fontSize.subtitle} font-bold mb-2 sm:mb-3`}>{event.title}</h3>
              <p className={`${fontSize.description} text-white/80`}>{event.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 「もっと見る」ボタン - Aboutセクションと同様のデザイン */}
      <div className="text-center mt-8 relative z-10">
        <button className="relative overflow-hidden group bg-[#00c896] hover:bg-transparent text-black font-bold py-3 px-10 rounded-full transition-all duration-300 border-2 border-[#00c896]">
          <span className="relative z-10 group-hover:text-[#00c896] transition-colors duration-300" onClick={() => window.location.href = '/events'}>もっと見る</span>
        </button>
      </div>
    </SectionWrapper>
  );
}
