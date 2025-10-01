export default function FudaFilmRollBg() {
  return (
    <div className="film-roll-container">
      <div className="film-roll-wrapper">
        {/* 左側のフィルムロール */}
        <div className="film-roll-side bg-filmroll-left film-roll-flow" />

        {/* 中央の空白スペース */}
        <div className="flex-grow" />

        {/* 右側のフィルムロール */}
        <div className="film-roll-side bg-filmroll-right film-roll-flow" />
      </div>
    </div>
  );
}
