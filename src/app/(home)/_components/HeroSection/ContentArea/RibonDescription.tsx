import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import { HeroSecRibon } from "./assets";
import ContentAreaInner from "./ContentArea";

interface RibonDescriptionProps {
  className?: string;
}

export default function RibonDescription({
  className = "",
}: RibonDescriptionProps) {
  return (
    <div
      className={cn("max-w-4xl", "xl:max-w-5xl", "2xl:max-w-[60vw]", className)}
    >
      <HeroSecRibon
        className={cn("relative w-full", `z-[${Z_INDEX.archDecoration}]`)}
      />
      <ContentAreaInner
        className={cn(
          "relative",
          `z-[${Z_INDEX.contentArea}]`,
          "px-14 md:px-27 lg:px-19",
          "-mt-8",
          "sm:-mt-16",
          "lg:-mt-20",
        )}
      />
    </div>
  );
}
