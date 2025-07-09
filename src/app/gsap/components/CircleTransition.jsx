"use client";
import { zIndexes, layout } from "../styles";

/**
 * u5186u5f62u30c8u30e9u30f3u30b8u30b7u30e7u30f3u30b3u30f3u30ddu30fcu30cdu30f3u30c8
 * @param {Object} props
 * @param {Array} props.colors - u5186u306eu8272u306eu914du5217
 * @param {Function} props.setCircleRef - u5186u306eu53c2u7167u3092u8a2du5b9au3059u308bu95a2u6570
 */
const CircleTransition = ({ colors, setCircleRef }) => {
  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: layout.fullViewport.width,
        height: layout.fullViewport.height,
        pointerEvents: "none", // u30b9u30afu30edu30fcu30ebu3092u59a8u3052u306au3044u3088u3046u306bu30ddu30a4u30f3u30bfu30fcu30a4u30d9u30f3u30c8u3092u7121u52b9u5316
        zIndex: zIndexes.circleTransition,
        willChange: "transform", // u30d1u30d5u30a9u30fcu30deu30f3u30b9u6539u5584
      }}
      aria-hidden="true" // u30a2u30afu30bbu30b7u30d3u30eau30c6u30a3u306eu305fu3081u306bu975eu8868u793au8981u7d20u3068u3057u3066u30deu30fcu30af
    >
      {colors.slice(1).map((color, index) => (
        <circle
          key={color}
          ref={(el) => setCircleRef(el, index)}
          cx="50%"
          cy="50%"
          r="0"
          fill={color}
        />
      ))}
    </svg>
  );
};

export default CircleTransition;
