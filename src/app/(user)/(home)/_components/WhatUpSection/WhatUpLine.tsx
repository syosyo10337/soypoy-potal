import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils/cn";

const DEFAULT_LINE_COUNT = 100;
const DEFAULT_WORD = "What’s up";

const whatUpLineVariants = cva("flex items-center overflow-hidden md:gap-1", {
  variants: {
    direction: {
      normal: "flex-row",
      reverse: "flex-row-reverse",
    },
  },
  defaultVariants: {
    direction: "normal",
  },
});

const wordVariants = cva("font-bernard-mt text-nowrap text-xl md:text-3xl/10", {
  variants: {
    direction: {
      normal: "mr-1",
      reverse: "ml-1 rotate-180",
    },
  },
  defaultVariants: {
    direction: "normal",
  },
});

interface WhatUpLineProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children">,
    VariantProps<typeof whatUpLineVariants> {
  word?: string;
  showWord?: boolean;
  lineCount?: number;
}

export function WhatUpLine({
  direction,
  word = DEFAULT_WORD,
  showWord = true,
  className,
  lineCount = DEFAULT_LINE_COUNT,
  ...restProps
}: WhatUpLineProps) {
  return (
    <div
      className={cn(whatUpLineVariants({ direction }), className)}
      {...restProps}
    >
      {showWord && <h2 className={wordVariants({ direction })}>{word}</h2>}
      <Stripe count={lineCount} />
    </div>
  );
}

interface StripeProps {
  count: number;
}
function Stripe({ count }: StripeProps) {
  return (
    <div className="flex gap-[3px]" role="presentation" aria-hidden="true">
      {Array.from({ length: count }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: <リストは動的に変更されないため。>
          key={i}
          className={cn(
            "h-[18px] w-[10px] md:h-7 md:w-4",
            i % 2 === 0 ? "bg-soypoy-accent" : "bg-soypoy-secondary",
          )}
        />
      ))}
    </div>
  );
}
