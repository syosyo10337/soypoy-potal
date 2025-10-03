import Image from "next/image";
import type * as React from "react";
import { EventType } from "@/domain/entities/eventType";
import { cn } from "@/utils/cn";

const variantMap = {
  [EventType.Art]: {
    image: "/images/bubleLabel/art.png",
    label: "アート",
  },
  [EventType.Comedy]: {
    image: "/images/bubleLabel/comeday.png",
    label: "お笑い",
  },
  [EventType.Dance]: {
    image: "/images/bubleLabel/dance.png",
    label: "ダンス",
  },
  [EventType.Design]: {
    image: "/images/bubleLabel/design.png",
    label: "デザイン",
  },
  [EventType.Impro]: {
    image: "/images/bubleLabel/impro.png",
    label: "インプロ",
  },
  [EventType.Impro_Kanji]: {
    image: "/images/bubleLabel/impor_kanji.png",
    label: "即興",
  },
  [EventType.Movie]: {
    image: "/images/bubleLabel/movie.png",
    label: "映画",
  },
  [EventType.Music]: {
    image: "/images/bubleLabel/music.png",
    label: "音楽",
  },
  [EventType.Photo]: {
    image: "/images/bubleLabel/photo.png",
    label: "写真",
  },
  [EventType.Talk]: {
    image: "/images/bubleLabel/talk.png",
    label: "トーク",
  },
  [EventType.Theater]: {
    image: "/images/bubleLabel/theater.png",
    label: "演劇",
  },
  [EventType.Workshop]: {
    image: "/images/bubleLabel/workshop.png",
    label: "ワークショップ",
  },
  [EventType.Other]: {
    image: "/images/bubleLabel/art.png",
    label: "その他",
  },
} as const satisfies Record<EventType, { image: string; label: string }>;

interface BubleLabelProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  variant: EventType;
  size?: number;
}

export default function BubleLabel({
  className,
  variant,
  size = 48,
  ...props
}: BubleLabelProps) {
  const { image, label } = variantMap[variant];

  if (!image) return null;

  return (
    <div className={cn("inline-block shrink-0", className)} {...props}>
      <Image
        src={image}
        alt={label}
        width={size}
        height={size}
        className="w-full h-full object-contain drop-shadow-md"
      />
    </div>
  );
}

export type { BubleLabelProps };
