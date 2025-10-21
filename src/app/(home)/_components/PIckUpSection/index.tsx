import { samplePickUpEvents } from "@/app/(home)/_dummies/pickUpEvent";
import EventGrid from "./EventGrid";
import { MarqueeDirection, PickUpMarquee } from "./PickUpMarquee";

export default function PickUpSection() {
  return (
    //NOTE:  relativeとbgでfudaより前に配置する。
    <section className="relative bg-soypoy-main text-white md:min-h-600px">
      <PickUpMarquee direction={MarqueeDirection.normal} />
      <EventGrid events={samplePickUpEvents} />
      <PickUpMarquee direction={MarqueeDirection.reverse} />
    </section>
  );
}
