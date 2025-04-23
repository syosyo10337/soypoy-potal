"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section1, Section2, Section3 } from './components';

gsap.registerPlugin(ScrollTrigger);

const sections = [
  { Component: Section1, color: 'white' },
  { Component: Section2, color: 'black' },
  { Component: Section3, color: 'green' },
];

const WipeTransitionPage = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mainEl = mainContainerRef.current;
    const stickyEl = stickyContainerRef.current;

    if (!mainEl || !stickyEl) return;

    const sectionElements = gsap.utils.toArray<HTMLElement>('.section-panel');
    if (sectionElements.length === 0) return;

    // Calculate diagonal distance for clip-path
    const diagonal = Math.sqrt(window.innerWidth ** 2 + window.innerHeight ** 2);
    const radiusPercent = (diagonal / 2 / Math.min(window.innerWidth, window.innerHeight)) * 100 * 1.5; // Ensure it covers corners, add buffer
    const finalClipPath = `circle(${radiusPercent}% at center)`;

    // --- Initial State --- 
    // Set initial state: Section 0 visible at zIndex 0, others hidden & stacked above
    gsap.set(sectionElements[0], {
      clipPath: finalClipPath, // Fully visible
      zIndex: 0,             // Bottom layer
    });
    sectionElements.slice(1).forEach((section, index) => {
      gsap.set(section, {
        clipPath: 'circle(0% at center)', // Start hidden
        zIndex: index + 1, // Stack above previous (Section 1 zIndex=1, Section 2 zIndex=2, etc.)
      });
    });

    // --- ScrollTrigger Timelines for Transitions --- 
    const sectionTimelines: gsap.core.Timeline[] = [];

    // Animate sections 1, 2, ... to reveal themselves over the previous one
    sectionElements.slice(1).forEach((sectionToReveal, index) => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: mainEl, // Trigger based on main scrollable container
          // Adjust index because we are animating section index+1 (e.g., Section 1 animates from scroll 0% to 33%)
          start: () => `${(index * 100) / sections.length}% top`, 
          end: () => `${((index + 1) * 100) / sections.length}% top`, 
          scrub: true,
          // markers: {startColor: "green", endColor: "red", fontSize: "12px", indent: 20 * index}, // Debug markers for reveal timelines
        },
      });

      // Animate the clip-path of the *current* section (sectionToReveal) to reveal it
      timeline.fromTo(
        sectionToReveal, // Target the section being revealed
        { clipPath: 'circle(0% at center)' }, // Start hidden
        { clipPath: finalClipPath, ease: 'none' } // End fully visible
      );
      
      sectionTimelines.push(timeline);
    });

    // --- ScrollTrigger for Snapping --- 
    // Calculate snap points (progress values 0, 1/3, 2/3, ..., 1)
    const snapPoints = sections.map((_, index) => index / sections.length);
    snapPoints.push(1); // Add the final snap point at the very end

    const snapTrigger = ScrollTrigger.create({
      trigger: mainEl,
      start: 'top top',
      end: `+=${sections.length * 100}%`, // Matches the height calculation
      snap: {
        snapTo: snapPoints, // Use the array of progress values
        directional: true, // Snap based on scroll direction
        duration: { min: 0.2, max: 0.5 },
        delay: 0.1,
        ease: 'power1.inOut',
      },
      // markers: {startColor: "green", endColor: "red", fontSize: "12px"}, // Uncomment for debugging
    });

    // Cleanup function
    return () => {
      sectionTimelines.forEach(tl => tl.kill());
      snapTrigger?.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div 
      ref={mainContainerRef} 
      style={{ height: `${sections.length * 100}vh`, position: 'relative' }}
    >
      <div 
        ref={stickyContainerRef} 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {sections.map(({ Component }, index) => (
          <div
            key={index}
            className="section-panel absolute top-0 left-0 h-full w-full"
            style={{ willChange: 'clip-path' }} // Performance hint
          >
            <Component />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WipeTransitionPage;
