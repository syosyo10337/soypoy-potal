// NOTE: buble labelの数仮定義
export const EventType = {
  Art: "art",
  Comedy: "comedy",
  Dance: "dance",
  Design: "design",
  Impro: "impro",
  Impro_Kanji: "impro_kanji",
  Movie: "movie",
  Music: "music",
  Photo: "photo",
  Talk: "talk",
  Theater: "theater",
  Workshop: "workshop",
  Other: "other",
} as const satisfies Record<string, string>;

export type EventType = (typeof EventType)[keyof typeof EventType];
