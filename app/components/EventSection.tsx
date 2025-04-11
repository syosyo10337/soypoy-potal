"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import ScrollToSection from "./ScrollToSection";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type EventCardProps = {
  image: string;
  date: string;
  title: string;
  description: string;
};

const EventCard = ({ image, date, title, description }: EventCardProps) => {
  return (
    <div className="bg-black/80 text-white h-full rounded-lg overflow-hidden shadow-lg flex flex-col">
      <div className="relative h-64 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="inline-block bg-[#00c896] text-black px-3 py-1 text-sm font-bold rounded-full mb-3">
          {date}
        </div>
        <h3 className="text-xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default function EventSection() {
  const events = [
    {
      image: "https://picsum.photos/id/1039/800/600",
      date: "SAT 2025.5.24-5.25",
      title: "宴2025 鹿炎祭",
      description:
        "SOY-POY主催による野外オープンマイクイベント「宴2025」を今年も5月24日-25日開催します。",
    },
    {
      image: "https://picsum.photos/id/1025/800/600",
      date: "FRI 2025.6.15",
      title: "月見の宴",
      description:
        "満月の夜に行われる音楽と詩の朗読会。静かな夜に心地よい音楽と言葉が響きます。",
    },
    {
      image: "https://picsum.photos/id/1062/800/600",
      date: "SAT 2025.7.20",
      title: "夏祭りライブ",
      description:
        "真夏の夜に行われる熱いライブイベント。地元アーティストによるパフォーマンスをお楽しみください。",
    },
  ];

  return (
    <section
      id="events"
      className="flex items-center justify-center relative min-h-[calc(100vh-75px)] mt-[75px] w-full overflow-hidden"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Upcoming Events
        </h2>

        {/* PC表示 - グリッド */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard
              key={index}
              image={event.image}
              date={event.date}
              title={event.title}
              description={event.description}
            />
          ))}
        </div>

        {/* SP表示 - カルーセル */}
        <div className="md:hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={1.2}
            centeredSlides={false}
            pagination={{ clickable: true }}
            className="event-swiper"
          >
            {events.map((event, index) => (
              <SwiperSlide key={index}>
                <EventCard
                  image={event.image}
                  date={event.date}
                  title={event.title}
                  description={event.description}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* 次のセクションへのスクロール矢印 */}
      <ScrollToSection
        targetId="about"
        className="scroll-arrow z-30"
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
