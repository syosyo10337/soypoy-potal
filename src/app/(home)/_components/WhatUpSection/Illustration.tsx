import Image from "next/image";
import { cn } from "@/utils/cn";

// NOTE: object-fitをobject-containへ変更したい。
function IllustrationRecord({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src="/images/whatup/record.png"
        alt="Record"
        fill
        className="object-fit"
      />
    </div>
  );
}

function IllustrationBar({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src="/images/whatup/bar.png"
        alt="Bar"
        fill
        className="object-fit"
      />
    </div>
  );
}

function IllustrationLighter({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src="/images/whatup/lighter.png"
        alt="Lighter"
        fill
        className="object-fit"
      />
    </div>
  );
}

export { IllustrationRecord, IllustrationBar, IllustrationLighter };
