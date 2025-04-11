"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "./SectionWrapper";
import Skeleton from "./ui/Skeleton";

type AccessSectionProps = {
  onArrowClick?: () => void;
};

export default function AccessSection({ onArrowClick }: AccessSectionProps) {
  // マップの読み込み状態を管理
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // マップが読み込まれたときのハンドラー
  const handleMapLoad = () => {
    setMapLoaded(true);
  };
  
  // コンポーネントがマウントされてから一定時間後にスケルトンを非表示にする
  // (iframeのonLoadイベントが信頼できない場合のフォールバック)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!mapLoaded) setMapLoaded(true);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [mapLoaded]);
  return (
    <SectionWrapper
      className="bg-[#4CAF50] text-white"
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
      <h2 className="text-4xl font-bold mb-6 text-center">Access</h2>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
        {/* Google Map */}
        <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden relative">
          {!mapLoaded && (
            <div className="absolute inset-0 z-10">
              <Skeleton 
                className="h-full w-full bg-gray-300/20" 
                rounded="rounded-lg"
              />
            </div>
          )}
          <iframe
            title="Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.573630504103!2d139.66509847550185!3d35.662875072593145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a985c43219%3A0xef11c14b0d78af2f!2sSOY-POY!5e0!3m2!1sja!2sjp!4v1743784454205!5m2!1sja!2sjp"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={handleMapLoad}
          />
        </div>

        {/* 店舗情報 */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-bold mb-4">
            yosemic PUB SOY-POY <span className="text-lg font-normal">[ヨセミック PUB SOY-POY]</span>
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
