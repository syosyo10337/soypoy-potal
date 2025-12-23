export default function ConnectionLine() {
  return (
    <svg
      width="315"
      height="23"
      viewBox="0 0 315 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[287px] md:w-[315px]"
      aria-hidden="true"
    >
      <title>ヒストリー接続線</title>
      {/* Horizontal line */}
      <line
        x1="0"
        y1="11.5"
        x2="315"
        y2="11.5"
        stroke="black"
        strokeWidth="1"
      />
      {/* Circle at the start */}
      <circle
        cx="12"
        cy="11.5"
        r="8"
        fill="#76794A"
        className="fill-soypoy-accent"
      />
    </svg>
  );
}
