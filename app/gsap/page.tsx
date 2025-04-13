"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const colors = ["white", "black", "green"];
const content = [
  {
    title: "Welcome to FlowSync",
    text: `Streamline your workflow with intuitive project management tools, built for teams of all sizes.
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
    `,
    img: "https://picsum.photos/800/400?random=1",
    textColor: "#000",
  },
  {
    title: "Powerful Features",
    text: `Automate tasks, visualize timelines, and collaborate in real-time.
    FlowSync offers a feature-rich experience including task dependencies, sprint planning, Gantt charts, and more.
    Whether you're managing software development or marketing campaigns, our tools are flexible to fit your workflow.
    Real-time editing and notifications keep your entire team up-to-date.
    Don't just manage projects — drive them forward with clarity and control.`,
    img: "https://picsum.photos/800/400?random=2",
    textColor: "#fff",
  },
  {
    title: "Join a Global Community",
    text: `Thousands of teams around the world trust FlowSync to keep their projects on track.
    Our global community shares tips, templates, and best practices so you can get the most out of our platform.
    From small startups to large enterprises, everyone finds value in the way FlowSync enables modern project management.
    Get inspired by how others succeed — and share your own journey too.
    Become part of something bigger — become part of the FlowSync movement.`,
    img: "https://picsum.photos/800/400?random=3",
    textColor: "#fff",
  },
];

function Section({ title, text, img, textColor, opacity, isActive }) {
  const contentRef = useRef(null);
  
  // コンテンツのアニメーション
  useEffect(() => {
    if (typeof window === "undefined" || !contentRef.current) return;
    
    // コンテンツ要素
    const content = contentRef.current;
    const contentElements = content.querySelectorAll('h1, p, div[data-image]');
    
    // 初期状態を設定
    gsap.set(contentElements, { opacity: 0, y: 30 });
    
    // アニメーションが準備完了している場合のみ実行
    if (isActive && opacity > 0.8) {
      // モバイルではアニメーションを軽量化
      const duration = window.innerWidth < 768 ? 0.5 : 0.8;
      const staggerTime = window.innerWidth < 768 ? 0.15 : 0.2;
      
      gsap.to(contentElements, {
        opacity: 1,
        y: 0,
        duration: duration,
        stagger: staggerTime,
        ease: "power2.out",
        delay: 0.3 // 円形トランジションが完了するのを待つ
      });
    } else {
      // 非アクティブになったらリセット
      gsap.set(contentElements, { opacity: 0, y: 30 });
    }
  }, [isActive, opacity]);
  
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
        alignItems: "flex-start", // 上揃えに変更してスクロールを可能に
        padding: "2rem",
        textAlign: "center",
        zIndex: 1010,
        color: textColor,
        opacity,
        overflowY: "auto", // スクロールを可能に
        backgroundColor: "transparent",
        pointerEvents: opacity > 0.5 ? "auto" : "none", // 非表示時はポインターイベントを無効化
      }}
    >
      <div ref={contentRef} style={{ maxWidth: "800px", paddingTop: "2rem", paddingBottom: "4rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>{title}</h1>
        <p
          style={{
            fontSize: "1.2rem",
            marginBottom: "2rem",
            lineHeight: 1.6,
            whiteSpace: "pre-line",
          }}
        >
          {text}
        </p>
        <div data-image style={{ position: 'relative', width: '100%', height: '400px', marginBottom: '2rem' }}>
          <Image
            src={img}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            priority
            style={{
              objectFit: 'cover',
              borderRadius: "12px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [opacity, setOpacity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [animationsReady, setAnimationsReady] = useState(false); // アニメーションの準備状態を追跡
  const [activeSection, setActiveSection] = useState(0); // アクティブなセクションを追跡
  const [isMobile, setIsMobile] = useState(false); // モバイルデバイスかどうかを追跡

  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  
  // モバイルデバイスかどうかをチェックする関数
  const checkIfMobile = useCallback(() => {
    if (typeof window !== "undefined") {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768;
    }
    return false;
  }, []);
  
  // クライアントサイドでのみGSAPを登録
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        gsap.registerPlugin(ScrollTrigger);
        setIsMobile(checkIfMobile());
      } catch (error) {
        console.error("GSAP plugin registration error:", error);
      }
    }
  }, [checkIfMobile]);

  // 円の参照を設定するための関数
  const setCircleRef = (el, index) => {
    circlesRef.current[index] = el;
  };

  // GSAPの初期化
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      // GSAPプラグインを登録と設定
      gsap.registerPlugin(ScrollTrigger);
      
      // モバイル用の設定
      ScrollTrigger.config({
        ignoreMobileResize: true, // モバイルのリサイズイベントを無視
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" // 自動更新するイベントを限定
      });

      // 画像のプリロードと初期化のための時間を確保
      const loadingTimer = setTimeout(() => {
        // ローディング状態を解除
        setLoading(false);
        
        // アニメーションの準備が整うまで少し待つ
        const animationReadyTimer = setTimeout(() => {
          setAnimationsReady(true);
          // ScrollTriggerを確実に更新
          ScrollTrigger.refresh(true);
        }, isMobile ? 800 : 500); // モバイルではより長く待つ
        
        return () => clearTimeout(animationReadyTimer);
      }, isMobile ? 1500 : 1000); // モバイルではより長く待つ

      return () => clearTimeout(loadingTimer);
    }
  }, [isMobile]);

  // アニメーションの設定
  useEffect(() => {
    // クライアントサイドでのみ実行、かつローディングが完了している場合
    if (typeof window === "undefined" || loading) return;

    console.log("GSAP Animation Setup");

    // ScrollTriggerの設定をクリア
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // 画面のサイズに基づいて最大半径を計算
    const diagonal = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2
    );
    
    // モバイル用の設定を調整
    const scrollSettings = {
      scrub: isMobile ? 1 : 0.5, // モバイルではスクロールの動きをよりスムーズに
      preventOverlaps: true,
      fastScrollEnd: true,
    };
    
    // 初期アニメーション（ローディング完了時）
    gsap.to("body", { duration: 0.3, opacity: 1, ease: "power1.out" });

    // 各セクションのアニメーションを設定
    colors.slice(1).forEach((_, index) => {
      const circle = circlesRef.current[index];
      if (!circle) return;

      // 初期状態では円を非表示に
      gsap.set(circle, { attr: { r: 0 } });

      // スクロールに連動したアニメーション
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: `${index * 33.33}% top`,
          end: `${(index + 1) * 33.33}% top`,
          scrub: scrollSettings.scrub,
          preventOverlaps: scrollSettings.preventOverlaps,
          fastScrollEnd: scrollSettings.fastScrollEnd,
          onEnter: () => {
            if (index === 0) {
              setCurrentIndex(1);
              setActiveSection(1);
            }
            if (index === 1) {
              setCurrentIndex(2);
              setActiveSection(2);
            }
          },
          onLeaveBack: () => {
            if (index === 0) {
              setCurrentIndex(0);
              setActiveSection(0);
            }
            if (index === 1) {
              setCurrentIndex(1);
              setActiveSection(1);
            }
          },
          onUpdate: (self) => {
            // フェードエフェクト
            const fadeProgress = self.progress;
            if (fadeProgress < 0.5) {
              setOpacity(1 - fadeProgress * 2);
            } else {
              setOpacity((fadeProgress - 0.5) * 2);
            }
          },
        }
      }).to(circle, {
        attr: { r: diagonal },
        ease: "none",
        duration: 1
      });
    });

    // ウィンドウリサイズ時の処理
    const handleResize = () => {
      // ScrollTriggerを更新
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      // ScrollTriggerをクリーンアップ
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading]);

  return (
    <div
      ref={containerRef}
      style={{
        height: "300vh",
        backgroundColor: colors[0],
        position: "relative",
        overflow: "hidden",
        touchAction: "pan-y", // タッチデバイスでの縦スクロールを明示的に許可
      }}
    >
      {(loading || !animationsReady) && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "white",
            color: "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2000,
          }}
        >
          <span style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
            {loading ? "Loading FlowSync Experience..." : "Preparing Animations..."}
          </span>
          <div style={{ width: "200px", height: "5px", backgroundColor: "#f0f0f0", borderRadius: "10px", overflow: "hidden" }}>
            <div 
              style={{ 
                height: "100%", 
                width: loading ? "70%" : "95%", 
                backgroundColor: "#00c896",
                transition: "width 0.5s ease-in-out"
              }}
            />
          </div>
        </div>
      )}

      <svg
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none", // スクロールを妨げないようにポインターイベントを無効化
          zIndex: 1000,
          willChange: 'transform', // パフォーマンス改善
        }}
      >
        {colors.slice(1).map((color, index) => (
          <circle
            key={color}
            ref={(el) => setCircleRef(el, index)}
            cx="50%"
            cy="50%"
            r="0"
            fill={color}
          />
        ))}
      </svg>

      {!loading && animationsReady && (
        <>
          {content.map((item, index) => (
            <Section
              key={index}
              {...item}
              opacity={currentIndex === index ? opacity : 0}
              isActive={activeSection === index}
            />
          ))}
        </>
      )}
    </div>
  );
}
