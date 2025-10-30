"use client";

import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import ArchDecoration from "./ArchDecoration";
import ClipPathDefinitions from "./ClipPathDefinitions";
import { useClipPathAnimation } from "./useClipPathAnimation";
import VideoPlayer from "./VideoPlayer";

export default function VideoLayer() {
  const { mobilePath, desktopPath } = useClipPathAnimation();

  return (
    <div className="relative w-full aspect-smartphone sm:aspect-retro lg:aspect-video">
      <ClipPathDefinitions mobilePath={mobilePath} desktopPath={desktopPath} />
      <div
        className={`absolute inset-0 [clip-path:url(#videoClipMobile)] sm:[clip-path:url(#videoClipDesktop)]`}
      >
        <VideoPlayer />
      </div>
      <ArchDecoration
        className={cn(
          "absolute inset-0 pt-2 px-2 pointer-events-none",
          `z-[${Z_INDEX.archDecoration}]`,
        )}
      />
    </div>
  );
}
