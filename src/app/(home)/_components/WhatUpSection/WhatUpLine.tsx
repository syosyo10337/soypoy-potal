import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";

const LINE_COUNT = 100;
const WORD = "What’s up";

const whatUpLineVariants = cva("flex items-center overflow-hidden md:gap-1", {
  variants: {
    direction: {
      normal: "flex-row",
      reverse: "flex-row-reverse",
    },

    hasWord: {
      true: "",
      false: "",
    },
  },
  compoundVariants: [
    {
      direction: "reverse",
      hasWord: true,
      className: "",
    },
  ],
  defaultVariants: {
    direction: "normal",
    hasWord: true,
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

type WhatUpLineProps = VariantProps<typeof whatUpLineVariants> & {
  word?: string;
  className?: string;
  lineCount?: number;
};

export function WhatUpLine({
  direction = "normal",
  hasWord = true,
  word = WORD,
  className,
  lineCount,
}: WhatUpLineProps) {
  return (
    <div className={cn(whatUpLineVariants({ direction, hasWord }), className)}>
      {hasWord && direction === "normal" && (
        <h2 className={wordVariants({ direction: "normal" })}>{word}</h2>
      )}
      {hasWord && direction === "reverse" && (
        <h2 className={wordVariants({ direction: "reverse" })}>{word}</h2>
      )}
      <WhatUpLineStripe lineCount={lineCount} />
    </div>
  );
}

function WhatUpLineStripe({ lineCount = LINE_COUNT }: { lineCount?: number }) {
  return (
    <div className="flex gap-[3px]">
      {[...Array(lineCount)].map((_, i) => (
        <div
          key={Math.random()}
          className={cn(
            "w-[10px] h-[18px] md:w-4 md:h-7",
            i % 2 === 0 ? "bg-soypoy-accent" : "bg-soypoy-secondary",
          )}
        />
      ))}
    </div>
  );
}
