import Image from "next/image";
import { cn } from "@/utils/cn";
import { BarImage, LighterImage, RecordImage } from "./assets";

// NOTE: object-fitをobject-containへ変更したい。
function IllustrationRecord({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image src={RecordImage} alt="Record" fill className="object-fit" />
    </div>
  );
}

function IllustrationBar({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image src={BarImage} alt="Bar" fill className="object-fit" />
    </div>
  );
}

function IllustrationLighter({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image src={LighterImage} alt="Lighter" fill className="object-fit" />
    </div>
  );
}

export { IllustrationRecord, IllustrationBar, IllustrationLighter };
