"use client";

import { cn } from "@/utils/cn";
import ClipPathDefinitions from "./ClipPathDefinitions";
import VideoPlayer from "./VideoPlayer";

export default function VideoLayer() {
  return (
    <div className="relative w-full aspect-smartphone sm:aspect-retro lg:aspect-video">
      <ClipPathDefinitions />
      <div
        className={cn(
          "absolute inset-0",
          "[clip-path:url(#videoClipMobile)]",
          "sm:[clip-path:url(#videoClipDesktop)]",
        )}
      >
        <VideoPlayer />
      </div>
    </div>
  );
}
