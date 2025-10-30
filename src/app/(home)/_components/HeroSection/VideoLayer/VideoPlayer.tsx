import { cn } from "@/utils/cn";

export default function VideoPlayer() {
  return (
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
  );
}
