import type { StaticImageData } from "next/image";
import historyPic201901 from "./assets/history-pic-2019.01.jpg";
import historyPic202001 from "./assets/history-pic-2020.01.jpg";
import historyPic202101 from "./assets/history-pic-2021.01.jpg";
import historyPic202201 from "./assets/history-pic-2022.01.jpg";
import historyPic202202 from "./assets/history-pic-2022.02.jpg";
import historyPic202501 from "./assets/history-pic-2025.01.jpg";

export interface HistoryEvent {
  id: string;
  yearDate: string;
  description: string;
  image: StaticImageData;
}
// TODO: APIで登録できるようにする
export const HISTORY_EVENTS: HistoryEvent[] = [
  {
    id: "1",
    yearDate: "2019.6",
    description:
      "ニューヨーク留学中のHibiki, Taito, Kotaroがオープンマイクを自主開催。チャイナタウンのカフェ・イベントスペースである「Silk Road Cafe」を拠点にダンサーやフォトグラファー、イラストレーターを集めて、yosemicとして活動を開始。",
    image: historyPic201901,
  },
  {
    id: "2",
    yearDate: "2020.8",
    description:
      "東京・下北沢で活動開始。下北沢アリーナで東京発のオープンマイクを開催。東京のメンバーが集まる。",
    image: historyPic202001,
  },
  {
    id: "3",
    yearDate: "2021.4",
    description:
      "下北沢にあるコワーキングスペースROBERTにて初のイベント『さらけだし』を開催。",
    image: historyPic202101,
  },
  {
    id: "4",
    yearDate: "2022.4",
    description:
      "クラウドファンディングにより、パブリックハウス（PUB）『SOY-POY』を設立。総支援者202人、合計160万円の支援。オープニングパーティを開催。",
    image: historyPic202201,
  },
  {
    id: "5",
    yearDate: "2022.9",
    description: "初の宴開催",
    image: historyPic202202,
  },
  {
    id: "6",
    yearDate: "2023.6",
    description: "EnsOが発足",
    image: historyPic202501,
  },
];
