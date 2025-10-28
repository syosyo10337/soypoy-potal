export default function VideoComponent() {
  return (
    <div className="w-full h-full">
      {/* SVG clipPath定義 - objectBoundingBoxで0-1の範囲に正規化 */}
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <clipPath id="videoClip" clipPathUnits="objectBoundingBox">
            {/* 
              形状の説明:
              - 左上(0,0)から開始
              - 右上(1,0)まで直線
              - 右側を下に直線で0.585の位置まで
              - 右下から中央下部へベジェ曲線
              - 中央下部(0.5,1)を通過
              - 左下から左上へベジェ曲線で戻る
            */}
            <path
              d="
                M 0,0
                L 1,0
                L 1,0.585
                C 1,0.85 0.777,1 0.5,1
                C 0.223,1 0,0.85 0,0.585
                Z
              "
            />
          </clipPath>
        </defs>
      </svg>

      {/* クリップパスを適用したwrapper */}
      <div className="w-full h-full" style={{ clipPath: "url(#videoClip)" }}>
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
          <source src="/videos/hero.mp4" type="video/mp4" />

          <source src="/videos/hero_sp.webm" type="video/webm" />
          <source src="/videos/hero_sp.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
