"use client";

import React, { useRef } from 'react';
import { Section1, Section2, Section3 } from './components';
import { useWipeTransitionSetup } from './hooks/useWipeTransitionSetup';

const sections = [Section1, Section2, Section3];

const WipeTransitionPage = () => {
  const mainContainerRef = useRef<HTMLDivElement>(null);
  const stickyContainerRef = useRef<HTMLDivElement>(null);

  useWipeTransitionSetup({
    mainContainerRef,
    stickyContainerRef,
    sections,
  });

  return (
    <div 
      ref={mainContainerRef} 
      style={{ height: `${sections.length * 100}vh`, position: 'relative' }}
    >
      <div 
        ref={stickyContainerRef} 
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        {sections.map((SectionComponent, index) => (
          <div
            key={index}
            className="section-panel absolute top-0 left-0 h-full w-full"
            style={{ willChange: 'clip-path' }} // Performance hint
          >
            <SectionComponent />
          </div>
        ))}
      </div>
    </div>
  );
};

export default WipeTransitionPage;
