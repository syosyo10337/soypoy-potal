import { EventType } from "@/domain/entities/eventType";

export interface PickUpEvent {
  id: string;
  thumbnail: string; //画像だけど、
  title: string;
  date: string;
  link: string;
  eventType: EventType;
}

export const samplePickUpEvents: PickUpEvent[] = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/400/300?random=1",
    title: "風音ひとり芝居公演 「キャンバスと一角」",
    date: "2025-10-01",
    link: "/events/canvas-and-corner",
    eventType: EventType.Theater,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/400/300?random=2",
    title: "OPEN MIC",
    date: "2025-10-24",
    link: "/events/open-mic",
    eventType: EventType.Impro,
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/400/300?random=3",
    title: '近藤大夢 Solo Concert Vol. 3 "Passion"',
    date: "2025-11-11",
    link: "/events/hiromu-kondo-concert",
    eventType: EventType.Music,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/400/300?random=4",
    title: "Tsuya-nii Session Party",
    date: "2025-01-01",
    link: "/events/tsuya-nii-session",
    eventType: EventType.Music,
  },
];
