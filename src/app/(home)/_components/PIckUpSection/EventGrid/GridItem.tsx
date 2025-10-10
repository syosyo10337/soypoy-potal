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

// TODO: 全体をリンクにする。
// TODO: 文字の折り返しを設定する。
export default function GridItem({
  thumbnail,
  title,
  link,
  date,
  eventType,
  index,
}: GridItemProps) {
  return (
    <div
      className={
        "group cursor-pointer py-6 px-4 md:px-5 border-soypoy-secondary"
      }
    >
      <div className="relative  mb-2 aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 overflow-hidden"
        />
        <div
          className={cn(
            getLabelPositionClasses(index),
            "scale-100 md:scale-110",
          )}
        >
          <BubleLabel variant={eventType} />
        </div>
      </div>
      <p className="text-sm text-soypoy-muted m-2 md:m-4">{date}</p>
      <h3 className="text-lg text-soypoy-secondary group-hover:text-soypoy-accent transition-colors break-words hyphens-auto leading-tight">
        {title}
      </h3>
      <Link
        href={link}
        className="inline-flex items-center text-muted-foreground text-xs mt-3"
      >
        Read More &gt;
      </Link>
    </div>
  );
}

const getLabelPositionClasses = (index: number) => {
  const position = index % 4;
  return cn(
    "absolute",
    position === 0 && "-top-3 -left-3", // 左上
    position === 1 && "-bottom-3 -left-3", // 左下
    position === 2 && "-top-3 -right-3", // 右上
    position === 3 && "-bottom-3 -right-3", // 右下
  );
};
