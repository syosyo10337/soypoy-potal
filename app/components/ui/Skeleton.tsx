"use client";

type SkeletonProps = {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: string;
  animate?: boolean;
};

export default function Skeleton({
  className = "",
  width,
  height,
  rounded = "rounded-md",
  animate = true,
}: SkeletonProps) {
  return (
    <div
      className={`bg-gray-200/20 ${rounded} ${animate ? "animate-pulse" : ""} ${className}`}
      style={{
        width: width,
        height: height,
      }}
    />
  );
}
