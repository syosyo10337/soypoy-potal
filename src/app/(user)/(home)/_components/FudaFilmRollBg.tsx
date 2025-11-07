// NOTE: Imageコンポーネントによる実装を検討したが、bg-imageとしての活用なので、現在の実装のままにする。
export default function FudaFilmRollBg() {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 w-full h-full pointer-events-none overflow-hidden z-1 flex justify-between items-stretch">
      {/* 左側のフィルムロール */}
      <div className="flex shrink-0 w-8 md:w-14 bg-filmroll-left film-roll-flow" />

      {/* 中央の空白スペース */}
      <div className="flex-grow" />

      {/* 右側のフィルムロール */}
      <div className="flex shrink-0 w-8 md:w-14 bg-filmroll-right film-roll-flow" />
    </div>
  );
}
