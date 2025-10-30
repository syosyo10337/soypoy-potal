import { Suspense } from "react";
import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import ArchDecoration from "./ArchDecoration";
import ClipPathDefinitions from "./ClipPathDefinitions";
import VideoPlayer from "./VideoPlayer";

export default function VideoLayer() {
  return (
    <>
      <ClipPathDefinitions />
      <div
        className={cn(
          "relative w-full",
          "aspect-smartphone",
          "sm:aspect-retro",
          "lg:aspect-video",
        )}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <VideoPlayer />
        </Suspense>
        <ArchDecoration
          className={cn(
            "absolute inset-0 pt-2 px-2 pointer-events-none",
            `z-[${Z_INDEX.archDecoration}]`,
          )}
        />
      </div>
    </>
  );
}
