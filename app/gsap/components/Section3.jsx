"use client";

import React from "react";
import Image from "next/image";
import { typography, spacing } from "../styles";

const Section3 = ({ sectionState, index }) => {
  const title = "Join a Global Community";
  const textColor = "#fff";
  const text = `Thousands of teams around the world trust FlowSync to keep their projects on track.
  Our global community shares tips, templates, and best practices so you can get the most out of our platform.
  From small startups to large enterprises, everyone finds value in the way FlowSync enables modern project management.
  Get inspired by how others succeed — and share your own journey too.
  Become part of something bigger — become part of the FlowSync movement.`;
  const img = "https://picsum.photos/800/400?random=3";

  return (
    <div
      data-section="3"
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
          paddingBottom: spacing.contentPadding.bottom,
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
Section3.textContent = `Thousands of teams around the world trust FlowSync to keep their projects on track.
  Our global community shares tips, templates, and best practices so you can get the most out of our platform.
  From small startups to large enterprises, everyone finds value in the way FlowSync enables modern project management.
  Get inspired by how others succeed — and share your own journey too.
  Become part of something bigger — become part of the FlowSync movement.`;
Section3.imageCount = 1;
Section3.complexity = 2.0; // コミュニティセクションは最も複雑

export default Section3;
