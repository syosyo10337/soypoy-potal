// TODO: video素材自体をデプロイしたい。
// もしくは、APIで動画を取得するようにする。
export default function VideoComponent() {
  const videoParams = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: "k3LKvJ14tvQ",
    controls: "0", // コントロールを非表示
    disablekb: "1", // キーボード操作を無効化
    fs: "0", // フルスクリーンボタンを非表示
    rel: "0", // 関連動画を表示しない
    modestbranding: "1", // YouTubeロゴを最小限に
    iv_load_policy: "3", // 動画アノテーションを非表示
    playsinline: "1", // インライン再生（モバイル用）
    showinfo: "0", // 動画情報を非表示
    enablejsapi: "0", // JavaScript APIを無効化
  });

  return (
    <div
      className="absolute inset-0 w-full h-1/2 md:h-full object-cover overflow-hidden
                 [clip-path:ellipse(70%_90%_at_50%_-5%)] 
                 md:[clip-path:ellipse(90%_100%_at_50%_-10%)]"
    >
      <div className="relative w-full h-full">
        <iframe
          src={`https://www.youtube.com/embed/k3LKvJ14tvQ?${videoParams.toString()}`}
          title="Hero Video"
          loading="lazy"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                 w-[max(100vw,177.78vh)] h-[max(100vh,56.25vw)] pointer-events-none"
          allow="autoplay; encrypted-media"
        />
      </div>
    </div>
  );
}
