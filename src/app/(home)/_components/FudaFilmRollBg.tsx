// FIME: 実質のスタイルがwidthではないところで実装されている。
export default function FudaFilmRollBg() {
  return (
    <div className="fixed inset-0 w-full h-screen pointer-events-none overflow-hidden z-0">
      <div className="flex justify-between items-stretch h-full">
        {/* 左側のフィルムロール */}
        <div className="flex-shrink-0 h-screen w-8 md:w-14 bg-filmroll-left film-roll-flow" />

        {/* 中央の空白スペース */}
        <div className="flex-grow" />

        {/* 右側のフィルムロール */}
        <div className="flex-shrink-0 h-screen w-8 md:w-14 bg-filmroll-right film-roll-flow" />
      </div>
    </div>
  );
}
