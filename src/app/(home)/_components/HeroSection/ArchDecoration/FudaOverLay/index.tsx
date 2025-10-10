import { cn } from "@/utils/cn";
import {
  ComedyFuda,
  CraftGinSvg,
  DanceFuda,
  ImproFuda,
  MovieFuda,
  MusicFuda,
  PhotoFuda,
  SessionFuda,
  ShimokitazawaStationSvg,
  StatueOfLibertySvg,
  TheaterFuda,
} from "./assets";

interface FudaOverLayProps {
  className?: string;
}

// TODO: TopFrameと繋げるべき
export default function FudaOverLay({ className }: FudaOverLayProps) {
  return (
    <div className={cn(className)}>
      {/* 左上エリア */}
      <div className="absolute top-30 left-80 transform -rotate-18">
        <MusicFuda className="w-10 h-auto" />
      </div>
      <div className="absolute top-50 left-40 transform rotate-8">
        <SessionFuda className="w-10 h-auto" />
      </div>
      <div className="absolute top-80 transform -rotate-10">
        <TheaterFuda className="w-10 h-auto" />
      </div>

      {/* 右上エリア */}
      <div className="absolute top-30 right-90 transform rotate-12">
        <ImproFuda className="w-10 h-auto" />
      </div>
      <div className="absolute top-38 right-6 transform rotate-14">
        <DanceFuda className="w-10 h-auto" />
      </div>
      <div className="absolute top-46 right-46 transform -rotate-8">
        <ComedyFuda className="w-10 h-auto" />
      </div>
      <div className="absolute top-80 right-4 transform rotate-10">
        <MovieFuda className="w-10 h-auto" />
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
        <PhotoFuda className="w-10 h-auto" />
      </div>
    </div>
  );
}
