"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import SectionWrapper from "./SectionWrapper";

type AccessSectionProps = {
  onArrowClick?: () => void;
};

export default function AccessSection({ onArrowClick }: AccessSectionProps) {
  // 画像の読み込み状態を管理
  const [imageLoaded, setImageLoaded] = useState(false);
  // セクションの表示状態を追跡
  const sectionRef = useRef<HTMLDivElement>(null);
  // 画像が表示されたかどうかを追跡
  const imageVisibleRef = useRef(false);
  // 画像が初期化されたかどうかを追跡
  const [imageInitialized, setImageInitialized] = useState(false);

  // 静的地図画像のパス
  const staticMapPath = "/images/soypoy-map.png";

  // 要素の可視性を監視するIntersectionObserverを設定
  useEffect(() => {
    // 既に画像が初期化されている場合は何もしない
    if (imageInitialized) return;

    // セクションが表示されたときに画像を読み込む
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || imageVisibleRef.current) continue;

          imageVisibleRef.current = true;
          setImageInitialized(true);
          // オブザーバーを停止
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    ); // 30%表示されたらトリガー

    // セクションを監視
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [imageInitialized]);

  // 画像が読み込まれたときのハンドラー
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  // コンポーネントがマウントされてから一定時間後にスケルトンを非表示にする
  // (onLoadイベントが信頼できない場合のフォールバック)
  useEffect(() => {
    if (imageInitialized && !imageLoaded) {
      const timer = setTimeout(() => {
        setImageLoaded(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [imageInitialized, imageLoaded]);
  return (
    <SectionWrapper
      ref={sectionRef}
      className="bg-[#4CAF50] text-white"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "3rem",
      }}
      showArrow
      onArrowClick={onArrowClick}
    >
      <h2 className="text-4xl font-bold mb-6 text-center">Access</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Google Map */}
        <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden relative">
          {!imageLoaded && (
            <div className="absolute inset-0 z-10">
              <Skeleton className="h-full w-full" />
            </div>
          )}
          {/* 画像が初期化された場合のみ表示 */}
          {imageInitialized && (
            <div className="relative w-full h-full">
              <Image
                src={staticMapPath}
                alt="SOY-POYの地図"
                fill
                className="object-cover"
                priority={false}
                onLoad={handleImageLoad}
              />
              <div className="absolute bottom-3 right-3 z-10">
                <a
                  href="https://maps.app.goo.gl/8H5FQCwcV2UpB1nUA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-3 rounded-full text-xs shadow-md transition-colors duration-300 flex items-center"
                >
                  <svg
                    aria-label="Google Maps"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <title>Google Maps</title>
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Google Mapsで見る
                </a>
              </div>
            </div>
          )}
        </div>

        {/* 店舗情報 */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">
            yosemic PUB SOY-POY{" "}
            <span className="text-lg font-normal">
              [ヨセミック PUB SOY-POY]
            </span>
          </h3>

          <div className="mb-6">
            <p className="text-lg mb-1">0120-155-0031</p>
            <p className="text-lg mb-4">東京都渋谷区神宮前6丁目14-2 3F</p>

            <div className="border-l-4 border-[#00c896] pl-4 py-2">
              <p className="mb-2">金曜日～日曜日</p>
              <p className="mb-2">OPEN 19:00 CLOSE 24:00</p>
              <p>祝日はOPEN 19:30</p>
            </div>
          </div>

          <a
            href="https://maps.app.goo.gl/8H5FQCwcV2UpB1nUA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#00c896] hover:bg-[#00a57d] text-black font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Google Mapで見る
          </a>
        </div>
      </div>
    </SectionWrapper>
  );
}
