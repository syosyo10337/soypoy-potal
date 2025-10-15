import { cn } from "@/utils/cn";
import { HeroSecRibon } from "./assets";
import ContentArea from "./ContentArea";

interface HeroSecDescriptionProps {
  className?: string;
}

// TODO: spようのアニメーションに合わせて配置を要検討
export default function RibonDescription({
  className = "",
}: HeroSecDescriptionProps) {
  return (
    <div className={cn("w-full max-w-4xl xl:max-w-5xl", className)}>
      <HeroSecRibon className="relative w-full z-20" />

      {/* コンテンツエリア - SP: absolute(リボンの下), MD以上: relative */}
      <ContentArea
        className={cn(
          "z-10",
          "px-14 md:px-27 lg:px-19",
          // SP: absoluteでリボンの下に配置
          "absolute top-26 left-0 right-0",
          // MD以上: relativeで通常フロー（リボンの下に配置）
          "md:relative md:top-auto md:-mt-16",
        )}
      />
    </div>
  );
}
