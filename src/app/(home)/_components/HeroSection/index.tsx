import RibonArea from "./RibonArea";
import VideoLayer from "./VideoArea";

export default function HeroSection() {
  return (
    <section id="hero-section" className={"relative w-full overflow-x-hidden"}>
      <VideoLayer />
      <RibonArea />
    </section>
  );
}
