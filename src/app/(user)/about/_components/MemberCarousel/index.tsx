"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import { MEMBERS } from "./MEMBERS";
import MemberPill from "./MemberPill";

// MemberCarouselカラーテーマ
const MEMBER_COLOR_THEME = [
  "#D6423B", // Red
  "#657C60", // Green
  "#2C3E50", // Dark Blue
  "#5B3A2E", // Brown
  "#8C6A1F", // Gold
] as const;

const pickMemberColor = (index: number) => {
  return MEMBER_COLOR_THEME[index % MEMBER_COLOR_THEME.length];
};

// Carousel constants
const CAROUSEL_CONFIG = {
  MEMBER_PILL_WIDTH: 156,
  GAP_MOBILE: 12,
  GAP_DESKTOP: 16,
  DRAG_ELASTIC: 0.05,
} as const;

// Calculate total width: MemberPill width + gap * number of members
const totalWidth =
  (CAROUSEL_CONFIG.MEMBER_PILL_WIDTH + CAROUSEL_CONFIG.GAP_MOBILE) *
  MEMBERS.length;

const SPIN_DISTANCE = -totalWidth * 3;

export default function MemberCarousel() {
  const x = useMotionValue(SPIN_DISTANCE);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // NOTE: for infinite carousel
  const doubleMembers = [...MEMBERS, ...MEMBERS];

  useEffect(() => {
    setIsReady(true);

    const controls = animate(x, 0, {
      duration: 2.5,
      ease: [0.15, 0.8, 0.2, 1],
      onComplete: () => {
        setIsAnimating(false);
      },
    });

    return () => controls.stop();
  }, [x]);

  return (
    <section className="py-12 md:py-20">
      <SectionTitle className="mb-8 md:mb-16">Member</SectionTitle>

      <div className="relative overflow-hidden">
        <motion.div
          className={cn(
            "flex gap-3 md:gap-4",
            "pb-4",
            isAnimating
              ? "cursor-default"
              : "cursor-grab active:cursor-grabbing",
            "select-none",
            !isReady && "invisible",
          )}
          style={{ x }}
          drag={isAnimating ? false : "x"}
          dragConstraints={{ left: -totalWidth, right: 0 }}
          dragElastic={CAROUSEL_CONFIG.DRAG_ELASTIC}
          dragMomentum={true}
          dragTransition={{
            bounceStiffness: 150,
            bounceDamping: 30,
            power: 0.4,
            timeConstant: 400,
            modifyTarget: (target) => {
              const current = x.get();
              const maxDelta = 250;
              const delta = target - current;

              if (Math.abs(delta) > maxDelta) {
                return current + Math.sign(delta) * maxDelta;
              }
              return target;
            },
          }}
          aria-label="メンバー一覧（スワイプ可能）"
        >
          {doubleMembers.map((member, i) => {
            return (
              <div key={`${member.id}-${i}`} className="shrink-0">
                <MemberPill
                  name={member.name}
                  role={member.role}
                  color={pickMemberColor(i)}
                  profileImage={member.profileImage}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
