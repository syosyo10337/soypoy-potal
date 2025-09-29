import Image from "next/image";
import { cn } from "@/utils/cn";

function IllustrationRecord({ className }: { className?: string }) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Image
        src="/images/whatup/record.png"
        alt="Record"
        fill
        className="object-contain"
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
        className="object-contain"
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
        className="object-contain"
      />
    </div>
  );
}

export { IllustrationRecord, IllustrationBar, IllustrationLighter };
