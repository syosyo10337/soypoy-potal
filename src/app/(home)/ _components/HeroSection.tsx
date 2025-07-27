"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

type HeroSectionProps = {
  onArrowClick?: () => void;
};

export default function HeroSection({ onArrowClick }: HeroSectionProps) {
  return (
    <SectionWrapper
      className="bg-[#FFF8E1] text-black"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1.5rem",
        position: "relative",
      }}
      showArrow={false}
      onArrowClick={onArrowClick}
    >
      <motion.div
        className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg lg:max-w-xl xl:max-w-2xl aspect-square flex items-center justify-center px-4"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Image
          src="/logo.png"
          alt="SOY-POY Logo"
          fill
          className="object-contain"
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
        />
      </motion.div>

      {onArrowClick && (
        <motion.button
          onClick={onArrowClick}
          className="absolute bottom-10 flex justify-center w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: "easeInOut",
            }}
          >
            <ChevronDown className="w-10 h-10 text-gray-500" />
          </motion.div>
        </motion.button>
      )}
    </SectionWrapper>
  );
}
