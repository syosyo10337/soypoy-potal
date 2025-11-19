import { cn } from "@/utils/cn";

export function PickUpLabel() {
  return (
    <div
      className={cn(
        "bg-soypoy-accent text-soypoy-main font-bernard-mt",
        "text-base/6 md:text-lg",
        "px-2 py-0.5",
        "transform -rotate-12",
        "z-20 absolute",
        "bottom-10 right-8",
        "lg:bottom-16 lg:right-auto  lg:-left-4",
      )}
    >
      PICK UP EVENT!
    </div>
  );
}
