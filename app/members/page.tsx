"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import Layout from "../components/Layout";

// スタイルのインポート
import "swiper/css";
import "swiper/css/effect-cards";

// メンバーデータ（サンプルとして8名に増やす）
const members = [
  {
    id: "member1",
    name: "山田 太郎",
    role: "オーナー / バーテンダー",
    description:
      "SOY-POYの創設者。10年以上のバーテンダー経験を持ち、独自のカクテルレシピを多数開発。音楽とお酒を通じて人と人をつなげることをモットーにしています。",
    image: "https://picsum.photos/id/1012/500/500",
  },
  {
    id: "member2",
    name: "佐藤 花子",
    role: "マネージャー / DJ",
    description:
      "SOY-POYの運営を担当。様々なイベントの企画や調整を行いながら、週末はDJとしても活躍。独自のセンスで選曲するセットは多くのファンに支持されています。",
    image: "https://picsum.photos/id/1027/500/500",
  },
  {
    id: "member3",
    name: "鈴木 健太",
    role: "バーテンダー / アーティスト",
    description:
      "カクテル作りの腕前とアート作品の両方で評価されるマルチタレント。SOY-POYの店内装飾やイベントのビジュアルデザインも担当しています。",
    image: "https://picsum.photos/id/1025/500/500",
  },
  {
    id: "member4",
    name: "高橋 美咲",
    role: "シェフ / イベントコーディネーター",
    description:
      "SOY-POYのフードメニューを担当。季節の食材を使った創作料理が得意。また、様々なコラボイベントの企画も行い、地域の飲食店やアーティストとの連携を強化しています。",
    image: "https://picsum.photos/id/1074/500/500",
  },
  {
    id: "member5",
    name: "伊藤 直樹",
    role: "音響エンジニア / DJ",
    description:
      "SOY-POYの音響システムを担当。ライブイベントの音響調整からBGMのセレクトまで、空間の音に関するすべてを手がけています。週末の深夜セッションでは人気DJとしても活動中。",
    image: "https://picsum.photos/id/1062/500/500",
  },
  {
    id: "member6",
    name: "中村 優子",
    role: "SNSマネージャー / バリスタ",
    description:
      "SOY-POYのSNS運用とコーヒーメニューを担当。写真撮影の腕前を活かした魅力的な投稿で、多くのフォロワーを獲得。オリジナルのコーヒードリンクも人気メニューの一つです。",
    image: "https://picsum.photos/id/1011/500/500",
  },
  {
    id: "member7",
    name: "小林 和也",
    role: "ミクソロジスト / 広報",
    description:
      "独創的なカクテル開発を担当。化学の知識を応用した実験的なドリンクは、SNSでも話題に。また、地域メディアとの連携や広報活動も行い、SOY-POYの認知度向上に貢献しています。",
    image: "https://picsum.photos/id/1066/500/500",
  },
  {
    id: "member8",
    name: "吉田 莉子",
    role: "アートディレクター",
    description:
      "SOY-POYの空間デザインを担当。季節ごとに変わる店内装飾や、アート展示の企画を手がけています。地元アーティストとのコラボレーションも積極的に推進しています。",
    image: "https://picsum.photos/id/1005/500/500",
  },
];

export default function MembersPage() {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  // hydrationエラー対策
  useEffect(() => {
    setMounted(true);
  }, []);

  // アクティブなスライドのインデックスを更新
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  // 特定のスライドに移動する関数
  const goToSlide = (index) => {
    swiperRef.current?.swiper?.slideTo(index);
  };

  if (!mounted) return null;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto pt-12 pb-20 px-4 md:px-6">
        <h1 className="text-3xl md:text-5xl font-bold mb-12 text-[#FF5A5F] tracking-wide drop-shadow-md text-center">
          Members
        </h1>

        {/* PC表示で横並び、モバイルでは縦並び */}
        <div className="flex flex-col lg:flex-row lg:items-start mb-16">
          {/* Swiper Cards Effect - PCサイズで左側に配置 */}
          <div className="w-full lg:w-1/2 max-w-sm mx-auto lg:mx-0 mb-12 lg:mb-0">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="mySwiper"
              onSlideChange={handleSlideChange}
              ref={swiperRef}
            >
              {members.map((member) => (
                <SwiperSlide
                  key={member.id}
                  className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-xl"
                >
                  <div className="relative h-80 w-full">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-white mb-1">
                      {member.name}
                    </h2>
                    <h3 className="text-lg font-medium text-[#FF5A5F] mb-3">
                      {member.role}
                    </h3>
                    <p className="text-gray-200 text-base leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 間隔を追加 */}
          <div className="hidden lg:block lg:w-12"></div>

          {/* メンバーアイコン - PCサイズで右側に配置 */}
          <div className="w-full lg:w-1/2 lg:pl-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center lg:text-left">
              All Members
            </h2>
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {members.map((member, index) => (
                <button
                  type="button"
                  key={member.id}
                  onClick={() => goToSlide(index)}
                  className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden transition-all duration-300 ${
                    activeIndex === index
                      ? "ring-2 ring-[#FF5A5F] scale-110 z-10"
                      : "opacity-80 hover:opacity-100 hover:scale-105"
                  }`}
                  title={member.name}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity ${
                      activeIndex === index ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    <span className="text-xs font-medium text-white text-center px-1 truncate">
                      {member.name.split(" ")[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-100 text-lg leading-relaxed drop-shadow-sm mb-6">
            SOY-POYのメンバーは、それぞれ異なるバックグラウンドと才能を持ったスタッフによって構成されています。
            バーテンダー、DJ、シェフ、アーティストなど、多様な専門性を活かして、唯一無二の体験を提供します。
          </p>
          <p className="text-gray-100 text-lg leading-relaxed drop-shadow-sm">
            SOY-POYに興味を持ち、新しいコミュニティの一員になりたい方は、お気軽にお問い合わせください。
          </p>
        </div>
      </div>
    </Layout>
  );
}
