import { samplePickUpEvents } from "@/app/(home)/_dummies/pickUpEvent";
import EventGrid from "./EventGrid";
import { PickUpMarquee, PickUpMarqueeReverse } from "./PickUpMarquee";

export default function PickUpSection() {
  return (
    //NOTE:  relativeとbgでfudaより前に配置する。
    <section className="relative bg-soypoy-main text-white md:min-h-600px">
      <PickUpMarquee />
      <EventGrid events={samplePickUpEvents} />
      <PickUpMarqueeReverse />
    </section>
  );
}
