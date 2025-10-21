import Image from "next/image";
import Link from "next/link";

import BubleLabel from "@/components/BubleLabel";
import type { EventType } from "@/domain/entities/eventType";
import { cn } from "@/utils/cn";

interface GridItemProps {
  thumbnail: string;
  title: string;
  link: string;
  date: string;
  eventType: EventType;
  index: number;
}

export default function GridItem({
  thumbnail,
  title,
  link,
  date,
  eventType,
  index,
}: GridItemProps) {
  return (
    <Link
      href={link}
      className={cn(
        "group block cursor-pointer py-6 px-4 md:px-5",
        getBorderClassName(index),
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-soypoy-accent focus-visible:ring-offset-2",
      )}
    >
      <div className="relative mb-2 aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={400}
          className={cn(
            "w-full h-full object-cover",
            "transition-transform duration-300 group-active:scale-105  md:group-hover:scale-105",
          )}
        />
        <div
          className={cn(
            getLabelPositionClassName(index),
            "scale-100 md:scale-110",
          )}
        >
          <BubleLabel variant={eventType} />
        </div>
      </div>
      <p className="text-sm text-soypoy-muted m-2 md:m-4">{date}</p>
      <h3
        className={cn(
          "text-lg text-soypoy-secondary",
          " group-active:text-soypoy-accent md:group-hover:text-soypoy-accent",
          "transition-colors break-words hyphens-auto leading-tight",
        )}
      >
        {title}
      </h3>
      <span className="inline-flex items-center text-muted-foreground text-xs mt-3">
        Read More &gt;
      </span>
    </Link>
  );
}

const getLabelPositionClassName = (index: number) => {
  const position = index % 4;
  return cn(
    "absolute",
    position === 0 && "-top-3 -left-3", // 左上
    position === 1 && "-bottom-3 -left-3", // 左下
    position === 2 && "-top-3 -right-3", // 右上
    position === 3 && "-bottom-3 -right-3", // 右下
  );
};

const getBorderClassName = (index: number) => {
  // 2列レイアウト（デフォルト〜xl未満）
  // 0列目（左列）にのみ右borderを追加 → 縦の線1本
  const needsRightBorder2Col = index % 2 === 0;
  // 0行目（上行）にのみ下borderを追加 → 横の線1本
  const needsBottomBorder2Col = index < 2;

  // 4列レイアウト（xl以上）
  // 0,1,2列目（最後以外）にのみ右borderを追加 → 縦の線3本
  const needsRightBorder4Col = index % 4 < 3;
  return cn(
    "border-soypoy-secondary",
    needsRightBorder2Col && "border-r border-soypoy-secondary",
    needsBottomBorder2Col && "border-b border-soypoy-secondary",
    "xl:border-r-0 xl:border-b-0",
    needsRightBorder4Col && "xl:border-r xl:border-soypoy-secondary",
  );
};
