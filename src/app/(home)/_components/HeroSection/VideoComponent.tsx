export function VideoComponent() {
  // レスポンシブ用の値定義
  const spRadius = "33.33%";
  const TopOffset = "40%";
  const mdRadius = "30%";

  const createClipPath = (radius: string, topOffset: string) => `shape(
      from 0% 0%,  /* 左上から開始 */
      line to 100% 0%, /* 右上へ直線 */
      line to 100% ${topOffset}, /* 右側を下へ */
      arc to calc(100% - ${radius}) calc(${topOffset} + ${radius}) of ${radius} cw small, /* 右下の1/4円 */
      line to ${radius} calc(${topOffset} + ${radius}), /* 下辺の直線 */
      arc to 0% ${topOffset} of ${radius} cw small, /* 左下の1/4円 */
      close
    )`;

  return (
    <div className="absolute inset-0 w-full h-1/2 md:h-full overflow-hidden">
      {/* SP版: md未満で表示 */}
      <div
        className="md:hidden relative w-full h-full"
        style={{
          clipPath: createClipPath(spRadius, TopOffset),
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          aria-label="soy-poy promotional background video"
        >
          <source
            src="/videos/hero.webm"
            type="video/webm"
            media="(max-width: 767px)"
          />
          {/* NOTE: fallback mp4 */}
          <source
            src="/videos/hero.mp4"
            type="video/mp4"
            media="(max-width: 767px)"
          />
        </video>
      </div>

      {/* PC版: md以上で表示 */}
      <div
        className="hidden md:block relative w-full h-full"
        style={{
          clipPath: createClipPath(mdRadius, TopOffset),
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover"
          aria-label="soy-poy promotional background video"
        >
          <source
            src="/videos/hero.webm"
            type="video/webm"
            media="(min-width: 768px)"
          />
          {/* NOTE: fallback mp4 */}
          <source
            src="/videos/hero-desktop.mp4"
            type="video/mp4"
            media="(min-width: 768px)"
          />
        </video>
      </div>
    </div>
  );
}
