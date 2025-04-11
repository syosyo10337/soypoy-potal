"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type EventSectionProps = {
  onArrowClick?: () => void;
};

export default function EventSection({ onArrowClick }: EventSectionProps) {
  const events = [
    {
      image: "https://picsum.photos/id/1039/800/600",
      date: "SAT 2025.5.24-5.25",
      title: "宴2025 鹿炎祭",
      description: "SOY-POY主催による野外オープンマイクイベント「宴2025」を今年も5月24日-25日開催します。",
    },
    {
      image: "https://picsum.photos/id/1025/800/600",
      date: "FRI 2025.6.15",
      title: "月見の宴",
      description: "満月の夜に行われる音楽と詩の朗読会。静かな夜に心地よい音楽と言葉が響きます。",
    },
    {
      image: "https://picsum.photos/id/1062/800/600",
      date: "SAT 2025.7.20",
      title: "夏祭りライブ",
      description: "真夏の夜に行われる熱いライブイベント。地元アーティストによるパフォーマンスをお楽しみください。",
    },
  ];

  return (
    <SectionWrapper
      className="bg-[#FF9800] text-white"
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
      <h2 className="text-4xl font-bold mb-6 text-center">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {events.map((event, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          >
            <div className="relative h-48 w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="inline-block bg-[#00c896] text-black px-3 py-1 text-sm font-bold rounded-full mb-3">
                {event.date}
              </div>
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <p className="text-gray-300">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
