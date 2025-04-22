"use client";

import React from 'react';
import Image from 'next/image';
import { typography, spacing } from '../styles';

// セクション情報を静的プロパティとして定義
const Section1 = ({ sectionState, index }) => {
  const title = "Welcome to FlowSync";
  const textColor = "#000";
  const text = `Streamline your workflow with intuitive project management tools, built for teams of all sizes.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.
  `;
  const img = "https://picsum.photos/800/400?random=1";

  return (
    <div
      data-section="1"
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
        overflowY: "auto",
        backgroundColor: "transparent",
        pointerEvents: "auto",
      }}
      data-section-index={index}
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

// セクションの情報を静的プロパティとして追加
Section1.textContent = `Streamline your workflow with intuitive project management tools, built for teams of all sizes.
  Our platform helps you plan, track, and collaborate effortlessly.
  With FlowSync, you can break down silos and align your team's efforts.
  Use customizable dashboards, detailed analytics, and integrations with your favorite tools to boost productivity.
  Start with a few clicks and experience a new era of team collaboration.`;
Section1.imageCount = 1;
Section1.complexity = 1.2; // 比較的シンプルなセクション

export default Section1;
