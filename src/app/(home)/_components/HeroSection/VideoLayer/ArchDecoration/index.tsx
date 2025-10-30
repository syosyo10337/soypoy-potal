"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import FudaOverLay from "./FudaOverLay";
import ArchImage from "./soypoyArch.png";

interface ArchDecorationProps {
  className: string;
}

export default function ArchDecoration({
  className,
}: ArchDecorationProps) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);



  return (
    <motion.div
      className={className}
      initial={{ scale: 0.1, y: "10%" }}
      animate={{
        scale: [0.1, 1],
        y: ["10%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => setIsAnimationComplete(true)}
    >
      {/* aspect-ratioを固定してレスポンシブ時の位置ずれを防ぐ */}
      <div className="relative w-full aspect-[1420/426]">
        <Image
          src={ArchImage}
          alt="Arch Decoration"
          width={1420}
          height={426}
          className="w-full h-auto"
        />
        {/* FudaOverLayを同じaspect-ratio内に配置 */}
        <FudaOverLay
          className={`hidden sm:block absolute inset-0 pointer-events-none ${
            isAnimationComplete ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>
    </motion.div>
  );
}
