import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import { HeroSecRibon } from "./assets";
import { InnerContent } from "./InnerContent";

export default function RibonArea() {
  return (
    <div
      className={cn(
        "max-w-4xl",
        "xl:max-w-5xl",
        "2xl:max-w-[60vw]",
        "relative w-full mx-auto",
        `z-[${Z_INDEX.ribonArea}]`,
        "-mt-[clamp(78px,30vw,180px)]",
        "sm:-mt-[clamp(140px,20vw,180px)]",
        "lg:-mt-[clamp(160px,16vw,220px)]",
        "2xl:-mt-[clamp(180px,12vw,280px)]",
      )}
    >
      <HeroSecRibon
        className={cn("relative w-full", `z-[${Z_INDEX.archDecoration}]`)}
      />
      <InnerContent
        className={cn(
          "relative",
          `z-[${Z_INDEX.ribonArea}]`,
          "px-14 md:px-27 lg:px-19",
          "-mt-8",
          "sm:-mt-16",
          "lg:-mt-20",
        )}
      />
    </div>
  );
}
