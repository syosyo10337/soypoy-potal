import { cn } from "@/utils/cn";

interface HistoryIndicatorProps {
  total: number;
  activeIndex: number;
}

export default function HistoryIndicator({
  total,
  activeIndex,
}: HistoryIndicatorProps) {
  return (
    <div
      className="flex items-center justify-center gap-2 mt-8"
      role="tablist"
      aria-label="ヒストリーインジケーター"
    >
      {Array.from({ length: total }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "rounded-full transition-all duration-300",
            index === activeIndex
              ? "w-3 h-3 bg-soypoy-accent"
              : "w-2 h-2 bg-black/30",
          )}
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`ヒストリー ${index + 1}`}
        />
      ))}
    </div>
  );
}
