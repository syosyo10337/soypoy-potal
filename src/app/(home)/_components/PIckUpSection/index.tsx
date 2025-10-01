import { PickUpMarquee, PickUpMarqueeReverse } from "./PickUpMarquee";

export default function PickUpSection() {
  return (
    //NOTE:  relativeとbgでfudaより前に配置する。
    <section className="relative bg-soypoy-main text-white">
      <PickUpMarquee />
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-soypoy-secondary">Pick Up Section</h2>
      </div>
      <PickUpMarqueeReverse />
    </section>
  );
}
