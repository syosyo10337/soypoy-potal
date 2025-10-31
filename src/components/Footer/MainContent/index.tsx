import { cn } from "@/utils/cn";
import { Acsess } from "./Acsess";
import { OpeningHours } from "./OpeningHours";

//TOOD: mainコンテンツの768pxから
export default function MainContent() {
  return (
    <section
      className={cn(
        "font-display flex w-full",
        "flex-col md:flex-row",
        "gap-8 md:gap-0",
      )}
    >
      <OpeningHours className="basis-2/5" />
      <Acsess className="basis-3/5" />
    </section>
  );
}
