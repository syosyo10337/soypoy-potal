"use client";

import { motion, useAnimationControls, useMotionValue } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
import MemberPill from "./MemberPill";

const MEMBERS = [
  {
    id: "1",
    name: "Taito Katsumata",
    role: "Writer",
    color: "#76794a",
    profileImage: "https://picsum.photos/seed/member1/200/200",
  },
  {
    id: "2",
    name: "Hisaaki Matsuda",
    role: "Back Officer",
    color: "#fab600",
    profileImage: "https://picsum.photos/seed/member2/200/200",
  },
  {
    id: "3",
    name: "Michael Yoshioka",
    role: "Director",
    color: "#ef3530",
    profileImage: "https://picsum.photos/seed/member3/200/200",
  },
  {
    id: "4",
    name: "Genki Miyachi",
    role: "Engineer",
    color: "#0080ea",
    profileImage: "https://picsum.photos/seed/member4/200/200",
  },
  {
    id: "5",
    name: "Hibiki Ueda",
    role: "Jazz Musician",
    color: "#a8001c",
    profileImage: "https://picsum.photos/seed/member5/200/200",
  },
  {
    id: "6",
    name: "Mizuki Araki",
    role: "Jazz Musician",
    color: "#ffb6c1",
    profileImage: "https://picsum.photos/seed/member6/200/200",
  },
  {
    id: "7",
    name: "Masanao Takahashi",
    role: "Drummer / Engineer",
    color: "#76794a",
    profileImage: "https://picsum.photos/seed/member7/200/200",
  },
  {
    id: "8",
    name: "Mizuki Niino",
    role: "Communication Designer",
    color: "#fab600",
    profileImage: "https://picsum.photos/seed/member8/200/200",
  },
  {
    id: "9",
    name: "Hina Okutani",
    role: " Art Director ",
    color: "#ef3530",
    profileImage: "https://picsum.photos/seed/member9/200/200",
  },
];

// Animation constants
const ANIMATION_CONFIG = {
  DURATION: 30,
  MEMBER_PILL_WIDTH: 156,
  GAP_MOBILE: 12,
  DRAG_ELASTIC: 0.1,
  REPEAT_COUNT: 3,
} as const;

export default function MemberCarousel() {
  const [isDragging, setIsDragging] = useState(false);
  const x = useMotionValue(0);
  const controls = useAnimationControls();

  // Calculate total width: MemberPill width + gap * number of members
  const totalWidth =
    (ANIMATION_CONFIG.MEMBER_PILL_WIDTH + ANIMATION_CONFIG.GAP_MOBILE) *
    MEMBERS.length;

  // Duplicate members for seamless infinite loop
  const duplicatedMembers = Array(ANIMATION_CONFIG.REPEAT_COUNT)
    .fill(MEMBERS)
    .flat();

  // Start auto-scroll animation from a given position
  const startAutoScroll = useCallback(
    (fromPosition = 0) => {
      // Calculate speed (pixels per second) to keep consistent velocity
      const pixelsPerSecond = totalWidth / ANIMATION_CONFIG.DURATION;
      const distance = totalWidth;
      const duration = distance / pixelsPerSecond;

      controls.start({
        x: [fromPosition, fromPosition - totalWidth],
        transition: {
          duration,
          ease: "linear" as const,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop" as const,
        },
      });
    },
    [controls, totalWidth],
  );

  // Start auto-scroll on mount
  useEffect(() => {
    startAutoScroll(0);
  }, [startAutoScroll]);

  const handleDragStart = () => {
    setIsDragging(true);
    controls.stop();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const currentX = x.get();
    startAutoScroll(currentX);
  };

  const handleAnimationComplete = () => {
    if (!isDragging) {
      x.set(0);
      startAutoScroll(0);
    }
  };

  return (
    <section className="py-12 md:py-20">
      <SectionTitle className="mb-8 md:mb-16">Member</SectionTitle>

      <div className="relative overflow-hidden">
        <motion.div
          className={cn(
            "flex gap-3 md:gap-4",
            "pb-4",
            "cursor-grab active:cursor-grabbing",
          )}
          style={{ x }}
          animate={controls}
          initial={{ x: 0 }}
          onAnimationComplete={handleAnimationComplete}
          drag="x"
          dragConstraints={{ left: -totalWidth * 2, right: 0 }}
          dragElastic={ANIMATION_CONFIG.DRAG_ELASTIC}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          aria-label="自動スクロール中のメンバー一覧（ドラッグ可能）"
        >
          {duplicatedMembers.map((member, index) => (
            <div key={`${member.id}-${index}`} className="shrink-0">
              <MemberPill
                name={member.name}
                role={member.role}
                color={member.color}
                profileImage={member.profileImage}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
