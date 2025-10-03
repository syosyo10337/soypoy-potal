import { cn } from "@/utils/cn";
import { HeroSecRibon } from "./assets";
import ContentArea from "./ContentArea";

interface HeroSecDescriptionProps {
  className?: string;
}

// TODO: fontを適用する。
export default function HeroSecBottomFrame({
  className = "",
}: HeroSecDescriptionProps) {
  return (
    <div className={cn("w-full max-w-4xl mx-auto relative", className)}>
      <div className="absolute top-4 left-0 right-0 w-full z-20 md:-top-24">
        <HeroSecRibon className="w-full h-auto" />
      </div>
      <div className="relative z-10 pt-26 px-2 sm:px-6 md:px-14">
        <ContentArea />
      </div>
    </div>
  );
}
