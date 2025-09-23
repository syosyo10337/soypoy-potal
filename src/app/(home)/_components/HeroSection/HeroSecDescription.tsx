import HeroSecBottomFrame from "@/assets/HeroSecBottomFrame.svg";
import { cn } from "@/utils/cn";

interface HeroSecDescriptionProps {
  className?: string;
}

export default function HeroSecDescription({
  className = "",
}: HeroSecDescriptionProps) {
  const text = "SOY-POYへのメッセージをお書きください...";

  return (
    <div className={cn("w-full max-w-4xl mx-auto relative", className)}>
      <p
        className={cn(
          "w-full min-h-[120px] sm:min-h-[140px] md:min-h-[160px]",
          "px-4 py-3 pt-10",

          "mt-[90px] sm:mt-[150px] md:mt-[190px] lg:mt-[210px]",
          "border-t-0 border-l-4 border-r-4 border-b-4 border-soypoy-secondary",
          "bg-soypoy-main",
          "shadow-lg hover:shadow-xl focus:shadow-xl",
          "text-lg font-medium leading-relaxed",
          "rounded-b-xl",
        )}
      >
        {text}
      </p>
      {/* SVGフレーム - 上層に配置 */}
      <div className="absolute top-0 left-0 right-0 w-full z-10 pointer-events-none">
        <HeroSecBottomFrame className="w-full h-auto" />
      </div>
    </div>
  );
}
