import { cn } from "@/utils/cn";

export default function VideoComponent() {
  return (
    <div className="w-full h-full">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="videoClipMobile" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0,0
                L 1,0
                L 1,0.80
                C 1,0.9 0.7,1 0.5,1
                C 0.3,1 0,0.9 0,0.80 
                Z
              "
            />
          </clipPath>
          <clipPath id="videoClipDesktop" clipPathUnits="objectBoundingBox">
            <path
              d="
                M 0,0
                L 1,0
                L 1,0.585
                C 1,0.85 0.777,1 0.5,1
                C 0.223,1 0,0.85 0,0.585
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      <div
        className={cn(
          "w-full h-full",
          "[clip-path:url(#videoClipMobile)]",
          "sm:[clip-path:url(#videoClipDesktop)]",
        )}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          aria-label="soy-poy promotional background video"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero_sp.webm" type="video/webm" />
          <source src="/videos/hero_sp.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
