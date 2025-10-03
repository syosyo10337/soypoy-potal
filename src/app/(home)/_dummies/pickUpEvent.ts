export interface PickUpEvent {
  id: string;
  thumbnail: string; //画像だけど、
  title: string;
  date: string;
  link: string;
  eventType: (typeof EventType)[keyof typeof EventType];
}

// NOTE: DBでも似たような定義をする必要がある。
const EventType = {
  art: "art",
  comedy: "comedy",
  dance: "dance",
  design: "design",
  impro: "impro",
  impro_kanji: "impro_kanji",
  movie: "movie",
  music: "music",
  photo: "photo",
  talk: "talk",
  theater: "theater",
  workshop: "workshop",
  other: "other",
} as const satisfies Record<string, string>;

export const samplePickUpEvents: PickUpEvent[] = [
  {
    id: "1",
    thumbnail: "https://picsum.photos/400/300?random=1",
    title: "風音ひとり芝居公演 「キャンバスと一角」",
    date: "2025-10-01",
    link: "/events/canvas-and-corner",
    eventType: EventType.theater,
  },
  {
    id: "2",
    thumbnail: "https://picsum.photos/400/300?random=2",
    title: "OPEN MIC",
    date: "2025-10-24",
    link: "/events/open-mic",
    eventType: EventType.impro,
  },
  {
    id: "3",
    thumbnail: "https://picsum.photos/400/300?random=3",
    title: '近藤大夢 Solo Concert Vol. 3 "Passion"',
    date: "2025-11-11",
    link: "/events/hiromu-kondo-concert",
    eventType: EventType.music,
  },
  {
    id: "4",
    thumbnail: "https://picsum.photos/400/300?random=4",
    title: "Tsuya-nii Session Party",
    date: "2025-01-01",
    link: "/events/tsuya-nii-session",
    eventType: EventType.music,
  },
];
