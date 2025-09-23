import CraftGinSvg from "@/assets/craft_gin.svg";
import ComedySvg from "@/assets/Fuda/comedy.svg";
import DanceSvg from "@/assets/Fuda/dance.svg";
import ImproSvg from "@/assets/Fuda/impro.svg";
import MovieSvg from "@/assets/Fuda/movie.svg";
import MusicSvg from "@/assets/Fuda/music.svg";
import PhotoSvg from "@/assets/Fuda/photo.svg";
import SessionSvg from "@/assets/Fuda/session.svg";
import TheaterSvg from "@/assets/Fuda/theater.svg";
import ShimokitazawaStationSvg from "@/assets/shimokitazawa_station.svg";
import StatueOfLibertySvg from "@/assets/statue_of_liberty.svg";
import { cn } from "@/utils/cn";

interface FudaOverLayProps {
  className?: string;
}

// TODO: TopFrameと繋げるべき
export default function FudaOverLay({ className }: FudaOverLayProps) {
  return (
    <div className={cn(className)}>
      {/* 左上エリア */}
      <div className="absolute top-30 left-80 transform -rotate-18">
        <MusicSvg className="w-10 h-auto" />
      </div>
      <div className="absolute top-50 left-40 transform rotate-8">
        <SessionSvg className="w-10 h-auto" />
      </div>
      <div className="absolute top-80 transform -rotate-10">
        <TheaterSvg className="w-10 h-auto" />
      </div>

      {/* 右上エリア */}
      <div className="absolute top-30 right-90 transform rotate-12">
        <ImproSvg className="w-10 h-auto" />
      </div>
      <div className="absolute top-38 right-6 transform rotate-14">
        <DanceSvg className="w-10 h-auto" />
      </div>
      <div className="absolute top-46 right-46 transform -rotate-8">
        <ComedySvg className="w-10 h-auto" />
      </div>
      <div className="absolute top-80 right-4 transform rotate-10">
        <MovieSvg className="w-10 h-auto" />
      </div>

      {/* 左下エリア */}
      <div className="absolute top-1/2 -left-20 transform -rotate-12">
        <ShimokitazawaStationSvg className="w-80 h-auto" />
      </div>
      <div className="absolute bottom-67 left-26 transform rotate-16">
        <CraftGinSvg className="w-16 h-auto" />
      </div>

      {/* 右下エリア */}
      <div className="absolute bottom-84 right-0 transform -rotate-20">
        <StatueOfLibertySvg className="w-30 h-auto" />
      </div>
      <div className="absolute bottom-60 right-10 transform rotate-10">
        <PhotoSvg className="w-10 h-auto" />
      </div>
    </div>
  );
}
