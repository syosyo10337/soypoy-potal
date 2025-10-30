import { cn } from "@/utils/cn";
import { Z_INDEX } from "../constants";
import RibonDescription from "./RibonDescription";

export default function ContentArea() {
  return (
    <RibonDescription
      className={cn(
        "relative w-full mx-auto",
        `z-[${Z_INDEX.ribonDescription}]`,
        "-mt-[clamp(78px,24vw,160px)]",
        "sm:-mt-[clamp(140px,20vw,180px)]",
        "lg:-mt-[clamp(160px,16vw,220px)]",
        "2xl:-mt-[clamp(180px,12vw,280px)]",
      )}
    />
  );
}
