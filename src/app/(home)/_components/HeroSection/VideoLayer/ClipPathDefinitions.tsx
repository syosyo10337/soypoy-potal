export default function ClipPathDefinitions() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden="true">
      <defs>
        <clipPath id="videoClipMobile" clipPathUnits="objectBoundingBox">
          <path
            d="
              M 0,0
              L 1,0
              L 1,0.70
              C 1,0.88 0.7,0.95 0.5,0.95
              C 0.3,0.95 0,0.88 0,0.70 
              Z
            "
          />
        </clipPath>
        <clipPath id="videoClipDesktop" clipPathUnits="objectBoundingBox">
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
  );
}
