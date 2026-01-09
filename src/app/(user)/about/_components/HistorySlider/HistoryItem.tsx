import type { StaticImageData } from "next/image";
import Image from "next/image";
import { cn } from "@/utils/cn";
import ConnectionLine from "./ConnectionLine";

export interface HistoryItemProps {
  yearDate: string;
  image?: string | StaticImageData;
  description: string;
}

export default function HistoryItem({
  yearDate,
  image,
  description,
}: HistoryItemProps) {
  return (
    <div
      className={cn(
        "relative",
        "w-[287px] md:w-[315px]",
        "shrink-0",
        "snap-center",
        "snap-always",
      )}
    >
      <div className="absolute top-0 left-0">
        <ConnectionLine />
      </div>

      <p
        className={cn(
          "font-display font-medium",
          "text-[40px] leading-[40px]",
          "text-black",
          "ml-3",
          "mt-11",
        )}
      >
        {yearDate}
      </p>

      <div
        className={cn(
          "relative",
          "w-[263px] h-[195px]",
          "ml-3",
          "overflow-hidden",
          "bg-gray-200",
        )}
      >
        {image ? (
          <Image
            src={image}
            alt={`${yearDate}のイベント画像`}
            fill
            sizes="263px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Image</span>
          </div>
        )}
      </div>

      <p
        className={cn(
          "font-display font-normal",
          "text-[16px] leading-[25px]",
          "text-black text-justify",
          "w-[263px]",
          "ml-3 mt-6",
        )}
      >
        {description}
      </p>
    </div>
  );
}
