import { cn } from "@/utils/cn";
import {
  ComedyFudaImage,
  DanceFudaImage,
  ImproFudaImage,
  MovieFudaImage,
  MusicFudaImage,
  PhotoFudaImage,
  SessionFudaImage,
  StationAndGinImage,
  StatueOfLibertyImage,
  TheaterFudaImage,
} from "./assets";
import FudaImage from "./FudaImage";

interface FudaOverLayProps {
  className?: string;
}

// NOTE: ビューポート幅基準の幅（w-[vw]）でサイズ調整。アスペクト比を維持しつつ、レスポンシブ時に比例的に縮小。
export default function FudaOverLay({ className }: FudaOverLayProps) {
  return (
    <div className={cn(className)}>
      <div
        className="absolute top-[20%] left-[23%] will-change-transform animate-float-1"
        style={{ "--rotate": "-23deg" } as React.CSSProperties}
      >
        <FudaImage src={MusicFudaImage} alt="Music" className="w-[3.5vw]" />
      </div>
      <div
        className="absolute top-[47%] left-[11%] will-change-transform animate-float-2"
        style={
          {
            "--rotate": "5deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={SessionFudaImage} alt="Session" className="w-[3.5vw]" />
      </div>
      <div
        className="absolute top-[80%] left-[0%] will-change-transform animate-float-3"
        style={
          {
            "--rotate": "-18deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={TheaterFudaImage} alt="Theater" className="w-[3.5vw]" />
      </div>

      <div
        className="absolute top-[19%] right-[26%] will-change-transform animate-float-4"
        style={
          {
            "--rotate": "13deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={ImproFudaImage} alt="Impro" className="w-[3.5vw]" />
      </div>
      <div
        className="absolute top-[21%] right-[1.8%] will-change-transform animate-float-5"
        style={
          {
            "--rotate": "14deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={DanceFudaImage} alt="Dance" className="w-[3.5vw]" />
      </div>
      <div
        className="absolute top-[40%] right-[12%] will-change-transform animate-float-6"
        style={
          {
            "--rotate": "-9deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={ComedyFudaImage} alt="Comedy" className="w-[3.5vw]" />
      </div>
      <div
        className="absolute top-[67%] right-[1.2%] will-change-transform animate-float-1"
        style={
          {
            "--rotate": "10deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={MovieFudaImage} alt="Movie" className="w-[3.5vw]" />
      </div>

      {/* 左下エリア - アニメーションなし */}
      <div className="absolute top-[105%] -left-[6%] transform -rotate-1">
        <FudaImage
          src={StationAndGinImage}
          alt="Shimokitazawa Station"
          className="w-[22vw]"
        />
      </div>

      {/* 右下エリア - 自由の女神はアニメーションなし、写真札はあり */}
      <div className="absolute top-[83%] right-[1%] transform -rotate-21">
        <FudaImage
          src={StatueOfLibertyImage}
          alt="Statue of Liberty"
          className="w-[10vw]"
        />
      </div>
      <div
        className="absolute top-[150%] right-[7%] will-change-transform animate-float-2"
        style={
          {
            "--rotate": "10deg",
          } as React.CSSProperties
        }
      >
        <FudaImage src={PhotoFudaImage} alt="Photo" className="w-[3.5vw]" />
      </div>
    </div>
  );
}
