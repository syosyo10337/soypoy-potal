import type { ComponentPropsWithoutRef } from "react";

const DEFAULT_TEXT = "PICK UP EVENT!";
const DEFAULT_REPEAT_COUNT = 10;

export const MarqueeDirection = {
  normal: "normal",
  reverse: "reverse",
} as const;
type MarqueeDirectionType = keyof typeof MarqueeDirection;

interface PickUpMarqueeProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  direction?: MarqueeDirectionType;
  text?: string;
  repeatCount?: number;
}

export function PickUpMarquee({
  direction = MarqueeDirection.normal,
  text = DEFAULT_TEXT,
  repeatCount = DEFAULT_REPEAT_COUNT,
}: PickUpMarqueeProps) {
  return (
    <div className="marquee-container marquee-gap-md font-bernard-mt text-2xl bg-soypoy-accent py-1">
      {Array.from({ length: repeatCount }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <リストは動的に変更されないため。>
          key={i}
          className={
            direction === MarqueeDirection.normal
              ? "marquee-item"
              : "marquee-item-reverse"
          }
        >
          {text}
        </div>
      ))}
    </div>
  );
}
