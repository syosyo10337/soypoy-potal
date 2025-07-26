"use client";

import { format } from "date-fns";
import { ja } from "date-fns/locale";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import type { EventEntity } from "@/domain/entities/event";
import { dateTimeFromISO } from "@/utils/date";
import { EventCalendarTile } from "./EventCalendarTile";
import { EventListItem } from "./EventListItem";

// カレンダーをクライアントサイドのみでレンダリングするためのダイナミックインポート
const Calendar = dynamic(() => import("react-calendar"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] flex items-center justify-center">
      <div className="text-white">カレンダーを読み込み中...</div>
    </div>
  ),
});

const MIN_DATE = new Date(2023, 0, 1);
const MAX_DATE = new Date(2025, 11, 31);

interface EventCalendarProps {
  events: EventEntity[];
}

export default function EventCalendar({ events }: EventCalendarProps) {
  const [activeMonth, setActiveMonth] = useState<Date>(new Date());
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  // 選択された月のイベントをフィルタリング
  const eventsForMonth = events.filter((event) => {
    const eventDate = dateTimeFromISO(event.date);
    return (
      eventDate.month === activeMonth.getMonth() + 1 &&
      eventDate.year === activeMonth.getFullYear()
    );
  });

  // イベントをクリックした時のハンドラー
  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    // イベントIDがわかる位置までスクロール
    const element = document.getElementById(`event-${eventId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // カレンダー上のタイル（日付）のコンテンツをカスタマイズ
  const tileContent = ({ date, view }: { date: Date; view: string }) => (
    <EventCalendarTile
      events={events}
      date={date}
      view={view}
      onEventClick={handleEventClick}
    />
  );

  // 月が変更された時のハンドラー
  const handleActiveStartDateChange = ({
    activeStartDate,
  }: { activeStartDate: Date }) => {
    if (activeStartDate) {
      setActiveMonth(activeStartDate);
    }
  };

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full">
        <div className="calendar-container bg-gray-900/80 backdrop-blur-md p-4 rounded-lg">
          <Calendar
            value={activeMonth}
            locale="ja-JP"
            tileContent={tileContent}
            className="bg-transparent border-0 text-white"
            onActiveStartDateChange={(args) => {
              if (args.activeStartDate) {
                handleActiveStartDateChange({
                  activeStartDate: args.activeStartDate,
                });
              }
            }}
            minDate={MIN_DATE}
            maxDate={MAX_DATE}
            minDetail="year"
            maxDetail="month"
          />
        </div>
      </div>

      <div className="w-full">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          {format(activeMonth, "yyyy年MM月", { locale: ja })}のイベント
        </h2>

        {eventsForMonth.length === 0 ? (
          <p className="text-gray-400">この月のイベントはありません。</p>
        ) : (
          <div className="flex flex-col gap-6">
            {eventsForMonth.map((event) => (
              <EventListItem
                key={event.id}
                event={event}
                selectedEventId={selectedEventId || undefined}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
