import Image from "next/image";
import { cn } from "@/utils/cn";
import { BarImage, LighterImage, RecordImage } from "./assets";

function IllustrationRecord({ className }: { className?: string }) {
  return (
    <IllustrationContainer className={cn(className)}>
      <Image
        src={RecordImage}
        alt="Record"
        fill
        className="object-contain sm:object-right"
      />
    </IllustrationContainer>
  );
}

function IllustrationBar({ className }: { className?: string }) {
  return (
    <IllustrationContainer className={cn(className)}>
      <Image
        src={BarImage}
        alt="Bar"
        fill
        className="object-contain sm:object-left"
      />
    </IllustrationContainer>
  );
}

function IllustrationLighter({ className }: { className?: string }) {
  return (
    <IllustrationContainer className={cn(className)}>
      <Image
        src={LighterImage}
        alt="Lighter"
        fill
        className="object-contain sm:object-right"
      />
    </IllustrationContainer>
  );
}

function IllustrationContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full h-full bg-soypoy-secondary", className)}
    >
      {children}
    </div>
  );
}

export { IllustrationRecord, IllustrationBar, IllustrationLighter };
