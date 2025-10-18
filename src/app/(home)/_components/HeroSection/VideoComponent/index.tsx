export default function VideoComponent() {
  const createClipPath = () => {
    const straightHeight = "58.5%";
    const curve1Height = "85%";
    const curve2Width = "22.3%";
    return `shape(
      from 0% 0%,
      hline to 100%,
      line to 100% ${straightHeight},
      curve to 50% 100% with 100% ${curve1Height} / calc(100% - ${curve2Width}) 100%,
      curve to 0% ${straightHeight} with ${curve2Width} 100% / 0% ${curve1Height},
      close
    )`;
  };

  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        clipPath: createClipPath(),
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover"
        aria-label="soy-poy promotional background video"
      >
        <source src="/videos/hero.webm" type="video/webm" />
        {/* NOTE: fallback mp4 */}
        <source src="/videos/hero.mp4" type="video/mp4" />

        <source src="/videos/hero_sp.webm" type="video/webm" />
        <source src="/videos/hero_sp.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
