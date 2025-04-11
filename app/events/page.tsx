"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { format, getMonth, getYear, parseISO } from "date-fns";
import { ja } from "date-fns/locale";
import "react-calendar/dist/Calendar.css";
import type { CalendarProps } from "react-calendar";

// カレンダーをクライアントサイドのみでレンダリングするためのダイナミックインポート
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="text-white">カレンダーを読み込み中...</div>
    </div>
  ),
});

// イベントデータ（画像URLを追加）
const events = [
  {
    id: 1,
    title: "ジャズナイト",
    date: "2025-04-15",
    time: "19:00 - 22:00",
    description:
      "地元ミュージシャンによるライブジャズパフォーマンスをお楽しみください。",
    imageUrl: "https://picsum.photos/id/1082/800/400",
  },
  {
    id: 2,
    title: "ワインテイスティング",
    date: "2025-04-20",
    time: "18:00 - 21:00",
    description:
      "世界各国のワインを楽しみながら、ソムリエから醸造プロセスやテイスティングのコツを学びましょう。",
    imageUrl: "https://picsum.photos/id/452/800/400",
  },
  {
    id: 3,
    title: "アートワークショップ",
    date: "2025-04-27",
    time: "14:00 - 17:00",
    description:
      "地元アーティストによる水彩画のワークショップ。初心者から上級者まで参加できます。",
    imageUrl: "https://picsum.photos/id/49/800/400",
  },
  {
    id: 4,
    title: "オープンマイクナイト",
    date: "2025-05-05",
    time: "20:00 - 23:00",
    description:
      "詩、音楽、スタンドアップコメディなど、あなたの才能を披露する夜。参加自由です。",
    imageUrl: "https://picsum.photos/id/96/800/400",
  },
  {
    id: 5,
    title: "クラフトビールナイト",
    date: "2025-05-12",
    time: "18:00 - 22:00",
    description:
      "地元の醸造所から厳選されたクラフトビールをお楽しみいただけます。",
    imageUrl: "https://picsum.photos/id/24/800/400",
  },
  {
    id: 6,
    title: "コーヒーテイスティング",
    date: "2025-05-18",
    time: "10:00 - 12:00",
    description: "世界各国のコーヒー豆を試飲し、その違いを学びましょう。",
    imageUrl: "https://picsum.photos/id/766/800/400",
  },
  {
    id: 7,
    title: "ポエトリーナイト",
    date: "2025-06-02",
    time: "19:00 - 21:00",
    description:
      "詩の朗読と共有の夕べ。自作の詩を持参するか、お気に入りの詩を共有してください。",
    imageUrl: "https://picsum.photos/id/42/800/400",
  },
  {
    id: 8,
    title: "サマーカクテルパーティー",
    date: "2025-06-15",
    time: "18:00 - 23:00",
    description:
      "夏をテーマにした特製カクテルをお楽しみください。軽食もご用意しています。",
    imageUrl: "https://picsum.photos/id/431/800/400",
  },
];

export default function EventsPage() {
  const [date, setDate] = useState<Date>(new Date());
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());
  const [isClient, setIsClient] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // activeMonthが変更されたときに発火するuseEffect
  useEffect(() => {
    console.log("Active month changed:", format(activeMonth, "yyyy-MM"));

    // この月のイベントをフィルタリング
    const eventsForMonth = events.filter((event) => {
      const eventDate = parseISO(event.date);
      return (
        getMonth(eventDate) === getMonth(activeMonth) &&
        getYear(eventDate) === getYear(activeMonth)
      );
    });

    console.log("Events for this month:", eventsForMonth.length);
  }, [activeMonth]);

  // 選択された月のイベントをフィルタリング
  const filteredEvents = events.filter((event) => {
    const eventDate = parseISO(event.date);
    return (
      getMonth(eventDate) === getMonth(activeMonth) &&
      getYear(eventDate) === getYear(activeMonth)
    );
  });

  // イベントをクリックした時のハンドラー
  const handleEventClick = (eventId: number) => {
    setSelectedEventId(eventId);
    // イベントIDがわかる位置までスクロール
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // カレンダー上のタイル（日付）のコンテンツをカスタマイズ
  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    // その日に開催されるすべてのイベントを検索
    const formattedDate = format(date, "yyyy-MM-dd");
    const eventsForDay = events.filter((event) => event.date === formattedDate);

    if (eventsForDay.length > 0) {
      return (
        <div className="event-marker">
          {eventsForDay.map((event, index) => (
            <div
              key={event.id}
              className="text-xs text-white bg-purple-600 rounded px-1 mt-1 truncate w-full text-left cursor-pointer hover:bg-purple-500"
              style={{
                marginTop: index > 0 ? "2px" : "0",
                zIndex: 50,
                position: "relative",
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleEventClick(event.id);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  e.stopPropagation();
                  handleEventClick(event.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`${event.title}のイベントを表示`}
            >
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  // onChange ハンドラー
  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      setDate(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      setDate(value[0]);
    }
  };

  // 月が変更された時のハンドラー
  const handleActiveStartDateChange = ({
    activeStartDate,
  }: { activeStartDate: Date }) => {
    if (activeStartDate) {
      console.log("Month changed to:", format(activeStartDate, "yyyy-MM"));
      setActiveMonth(activeStartDate);
    }
  };

  if (!isClient) {
    return (
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
          EVENTS
        </h1>
        <div className="h-[500px] flex items-center justify-center">
          <div className="text-white">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        EVENTS
      </h1>

      <div className="flex flex-col gap-12">
        <div className="w-full">
          <div className="calendar-container bg-gray-900/80 backdrop-blur-md p-4 rounded-lg">
            <Calendar
              onChange={handleDateChange}
              value={date}
              locale="ja-JP"
              tileContent={tileContent}
              className="bg-transparent border-0 text-white"
              onActiveStartDateChange={handleActiveStartDateChange}
            />
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            {format(activeMonth, "yyyy年MM月", { locale: ja })}のイベント
          </h2>

          {filteredEvents.length === 0 ? (
            <p className="text-gray-400">この月のイベントはありません。</p>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredEvents.map((event) => (
                <div
                  id={`event-${event.id}`}
                  key={event.id}
                  className={`bg-gray-900/70 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                    selectedEventId === event.id
                      ? "ring-2 ring-purple-500"
                      : ""
                  }`}
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative">
                      <img
                        src={event.imageUrl}
                        alt={event.title}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    </div>
                    <div className="p-5 md:w-2/3 flex flex-col">
                      <h3 className="text-xl font-semibold mb-2 text-white">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 mb-3">
                        <div className="flex items-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>
                            {format(parseISO(event.date), "yyyy年MM月dd日", {
                              locale: ja,
                            })}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-400">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{event.time}</span>
                        </div>
                      </div>
                      <p className="text-gray-300 mb-4 flex-grow">
                        {event.description}
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-600 transition-colors mt-auto w-fit"
                      >
                        詳細を見る
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
