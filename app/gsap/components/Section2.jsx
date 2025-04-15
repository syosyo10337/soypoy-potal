"use client";

import React from 'react';
import Image from 'next/image';
import { typography, spacing } from '../styles';

const Section2 = ({ isActive, opacity, sectionState, index }) => {
  const title = "Powerful Features";
  const textColor = "#fff";
  const text = `Automate tasks, visualize timelines, and collaborate in real-time.
  FlowSync offers a feature-rich experience including task dependencies, sprint planning, Gantt charts, and more.
  Whether you're managing software development or marketing campaigns, our tools are flexible to fit your workflow.
  Real-time editing and notifications keep your entire team up-to-date.
  Don't just manage projects — drive them forward with clarity and control.`;
  const img = "https://picsum.photos/800/400?random=2";

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: spacing.container,
        textAlign: "center",
        zIndex: 1010,
        color: textColor,
        opacity,
        overflowY: "auto",
        backgroundColor: "transparent",
        pointerEvents: opacity > 0.5 ? "auto" : "none",
      }}
      aria-hidden={opacity <= 0.5 ? "true" : "false"}
    >
      <div 
        style={{ 
          maxWidth: spacing.contentMaxWidth, 
          paddingTop: spacing.contentPadding.top, 
          paddingBottom: spacing.contentPadding.bottom 
        }}
      >
        <h1 style={typography.heading}>{title}</h1>
        <p
          style={{
            ...typography.body,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </p>
        <div
          style={{
            marginTop: spacing.elementSpacing,
            position: "relative",
            width: "100%",
            height: "300px",
          }}
          data-image
        >
          <Image
            src={img}
            alt={title}
            fill
            style={{ objectFit: "cover", borderRadius: "8px" }}
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Section2;
