export default function ConnectionLine() {
  return (
    <svg
      width="840"
      height="23"
      viewBox="0 0 840 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-[574px] md:w-[840px]"
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <title>ヒストリー接続線</title>
      {/* Horizontal line - extends to next item */}
      <line
        x1="0"
        y1="11.5"
        x2="840"
        y2="11.5"
        stroke="black"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
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
