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

// TODO: TopFrameと繋げるべき
export default function FudaOverLay({ className }: FudaOverLayProps) {
  return (
    <div className={cn(className)}>
      {/* 左上エリア */}
      <div
        className="absolute top-[7%] left-[14%] will-change-transform animate-float-1"
        style={{ "--rotate": "-18deg" } as React.CSSProperties}
      >
        <FudaImage src={MusicFudaImage} alt="Music" className="w-[14%]" />
      </div>
      <div
        className="absolute top-[12%] left-[7%] will-change-transform animate-float-2"
        style={{ "--rotate": "8deg" } as React.CSSProperties}
      >
        <FudaImage src={SessionFudaImage} alt="Session" className="w-[14%]" />
      </div>
      <div
        className="absolute top-[19%] left-0 will-change-transform animate-float-3"
        style={{ "--rotate": "-10deg" } as React.CSSProperties}
      >
        <FudaImage src={TheaterFudaImage} alt="Theater" className="w-[14%]" />
      </div>

      {/* 右上エリア */}
      <div
        className="absolute top-[7%] right-[16%] will-change-transform animate-float-4"
        style={{ "--rotate": "12deg" } as React.CSSProperties}
      >
        <FudaImage src={ImproFudaImage} alt="Impro" className="w-[14%]" />
      </div>
      <div
        className="absolute top-[9%] right-[1%] will-change-transform animate-float-5"
        style={{ "--rotate": "14deg" } as React.CSSProperties}
      >
        <FudaImage src={DanceFudaImage} alt="Dance" className="w-[14%]" />
      </div>
      <div
        className="absolute top-[11%] right-[8%] will-change-transform animate-float-6"
        style={{ "--rotate": "-8deg" } as React.CSSProperties}
      >
        <FudaImage src={ComedyFudaImage} alt="Comedy" className="w-[14%]" />
      </div>
      <div
        className="absolute top-[19%] right-[0.7%] will-change-transform animate-float-1"
        style={{ "--rotate": "10deg" } as React.CSSProperties}
      >
        <FudaImage src={MovieFudaImage} alt="Movie" className="w-[14%]" />
      </div>

      {/* 左下エリア */}
      <div
        className="absolute top-1/2 -left-[3.5%] will-change-transform animate-float-2"
        style={{ "--rotate": "-12deg" } as React.CSSProperties}
      >
        <FudaImage
          src={StationAndGinImage}
          alt="Shimokitazawa Station"
          className="w-[70%]"
        />
      </div>

      {/* 右下エリア */}
      <div
        className="absolute bottom-[20%] right-0 will-change-transform animate-float-4"
        style={{ "--rotate": "-20deg" } as React.CSSProperties}
      >
        <FudaImage
          src={StatueOfLibertyImage}
          alt="Statue of Liberty"
          className="w-[33%]"
        />
      </div>
      <div
        className="absolute bottom-[14%] right-[1.75%] will-change-transform animate-float-5"
        style={{ "--rotate": "10deg" } as React.CSSProperties}
      >
        <FudaImage src={PhotoFudaImage} alt="Photo" className="w-[14%]" />
      </div>
    </div>
  );
}
