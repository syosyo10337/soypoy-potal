import { cn } from "@/utils/cn";

export function PickUpLabel() {
  return (
    <div
      className={cn(
        "bg-soypoy-accent text-soypoy-main font-bernard-mt",
        "text-base/4 md:text-lg",
        "px-2 py-1",
        "transform -rotate-12",
        "z-10 absolute bottom-10 right-8",
      )}
    >
      PICK UP EVENT!
    </div>
  );
}
