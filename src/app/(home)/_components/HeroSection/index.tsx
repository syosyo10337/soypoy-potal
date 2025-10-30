import ContentArea from "./ContentArea";
import VideoLayer from "./VideoLayer";

export default function HeroSection() {
  return (
    <section id="hero-section" className={"relative w-full overflow-x-hidden"}>
      <VideoLayer />
      <ContentArea />
    </section>
  );
}
