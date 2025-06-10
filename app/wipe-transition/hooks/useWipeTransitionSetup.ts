import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- Constants ---
const SECTION_PANEL_SELECTOR = ".section-panel";
const CLIP_PATH_BUFFER_MULTIPLIER = 1.5; // Ensures clip-path covers corners

interface UseWipeTransitionSetupProps {
  mainContainerRef: React.RefObject<HTMLDivElement | null>;
  stickyContainerRef: React.RefObject<HTMLDivElement | null>;
  sections: React.ComponentType<Record<string, never>>[]; // Expect an array of components
}

/**
 * Custom hook to set up the GSAP wipe transition and scroll snapping.
 * Encapsulates the logic from the original useEffect.
 */
export function useWipeTransitionSetup({
  mainContainerRef,
  stickyContainerRef,
  sections,
}: UseWipeTransitionSetupProps): void {
  useEffect(() => {
    const scrollContainer = mainContainerRef.current;
    const stickyWrapper = stickyContainerRef.current;

    // Ensure refs are available
    if (!scrollContainer || !stickyWrapper) {
      console.warn("Refs not available for GSAP setup.");
      return;
    }

    const sectionElements = gsap.utils.toArray<HTMLElement>(
      SECTION_PANEL_SELECTOR,
      stickyWrapper, // Context is the stickyWrapper
    );

    // Ensure sections are rendered
    if (
      sectionElements.length === 0 ||
      sectionElements.length !== sections.length
    ) {
      console.warn("Section elements not found or mismatch count.");
      return;
    }

    // --- Calculations (kept identical to original) ---
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const diagonal = Math.sqrt(viewportWidth ** 2 + viewportHeight ** 2);
    const radius = diagonal / 2;
    const minDimension = Math.min(viewportWidth, viewportHeight);
    // Ensure radiusPercent calculation is identical, including the buffer
    const radiusPercent =
      (radius / minDimension) * 100 * CLIP_PATH_BUFFER_MULTIPLIER;
    const finalClipPath = `circle(${radiusPercent}% at center)`;

    // --- Initial State Setup (kept identical) ---
    gsap.set(sectionElements[0], {
      clipPath: finalClipPath,
      zIndex: 0,
    });
    sectionElements.slice(1).forEach((section, index) => {
      gsap.set(section, {
        clipPath: "circle(0% at center)",
        zIndex: index + 1,
      });
    });

    // --- Transition Timelines Setup (kept identical) ---
    const sectionTimelines: gsap.core.Timeline[] = [];
    sectionElements.slice(1).forEach((sectionToReveal, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scrollContainer, // Use main scroll container
          start: () => `${(index * 100) / sections.length}% top`,
          end: () => `${((index + 1) * 100) / sections.length}% top`,
          scrub: true,
          // markers: {startColor: "green", endColor: "red", fontSize: "12px", indent: 20 * index}, // Keep markers commented out
        },
      });
      timeline.fromTo(
        sectionToReveal,
        { clipPath: "circle(0% at center)" },
        { clipPath: finalClipPath, ease: "none" },
      );
      sectionTimelines.push(timeline);
    });

    // --- Snapping Trigger Setup (kept identical) ---
    const snapPoints = sections.map((_, index) => index / sections.length);
    snapPoints.push(1);
    const snapTrigger = ScrollTrigger.create({
      trigger: scrollContainer,
      start: "top top",
      end: `+=${sections.length * 100}%`,
      snap: {
        snapTo: snapPoints,
        directional: true,
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1,
        ease: "power1.inOut",
      },
      // markers: {startColor: "green", endColor: "red", fontSize: "12px"}, // Keep markers commented out
    });

    // --- Cleanup (kept identical) ---
    return () => {
      console.log("Cleaning up Wipe Transition GSAP elements");
      for (const tl of sectionTimelines) {
        tl.kill();
      }
      snapTrigger?.kill(); // Kill snap trigger
      // Optional: A more robust cleanup might involve killing tweens of elements too
      // gsap.killTweensOf(sectionElements);
      // However, stick to original cleanup to avoid behavior changes
      // ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Original code had this, keep if needed, but potentially overkill if triggers are managed explicitly
    };
  }, [sections, mainContainerRef, stickyContainerRef]); // Keep original dependencies (or lack thereof: [])
  // Correction: Add dependencies explicitly to adhere to React Hook rules,
  // but ensure 'sections' is stable or memoized if passed from parent
  // to avoid unnecessary re-runs. If sections array is defined outside
  // component, it's stable. Refs are stable.
}
