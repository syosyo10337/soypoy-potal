"use client";

import { useEffect, useRef, useCallback, useReducer, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 分割したコンポーネントをインポート
import { CircleTransition, ContentSection, LoadingScreen } from "./components";
import { breakpoints } from "./styles";

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

// Section コンポーネントは別ファイルに移動したため削除

// セクション状態を管理するreducer
const sectionReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SECTION':
      return {
        ...state,
        currentIndex: action.payload.index,
        activeSection: action.payload.index,
        opacity: action.payload.opacity || state.opacity
      };
    case 'UPDATE_OPACITY':
      return {
        ...state,
        opacity: action.payload
      };
    case 'TRANSITION_START':
      // トランジション開始時の状態更新
      return {
        ...state,
        isTransitioning: true
      };
    case 'TRANSITION_END':
      // トランジション終了時の状態更新
      return {
        ...state,
        isTransitioning: false
      };
    default:
      return state;
  }
};

export default function Page() {
  // 関連する状態をまとめて管理
  const [sectionState, dispatchSection] = useReducer(sectionReducer, {
    currentIndex: 0,
    activeSection: 0,
    opacity: 1,
    isTransitioning: false
  });
  
  const [loading, setLoading] = useState(true);
  const [animationsReady, setAnimationsReady] = useState(false); // アニメーションの準備状態を追跡
  const [isMobile, setIsMobile] = useState(false); // モバイルデバイスかどうかを追跡

  const containerRef = useRef(null);
  const circlesRef = useRef([]);
  
  // モバイルデバイスかどうかをチェックする関数
  const checkIfMobile = useCallback(() => {
    if (typeof window !== "undefined") {
      return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < breakpoints.mobile;
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

  // 画像のプリロード関数
  const preloadImages = async () => {
    try {
      console.log('画像のプリロード開始');
      const imagePromises = content.map((item, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`画像読み込み完了: ${index + 1}/${content.length}`);
            resolve();
          };
          img.onerror = (err) => {
            console.error(`画像読み込みエラー: ${item.img}`, err);
            reject(err);
          };
          img.src = item.img;
        });
      });
      
      await Promise.all(imagePromises);
      console.log('全ての画像のプリロード完了');
      return true;
    } catch (error) {
      console.error('画像プリロード中にエラーが発生:', error);
      return false;
    }
  };
  
  // GSAPの初期化とリソース読み込み
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

      // ドキュメントの読み込み完了を監視
      const checkDocumentReady = () => {
        return document.readyState === 'complete';
      };
      
      // 全てのリソースの読み込みを待つ
      const loadAllResources = async () => {
        // ドキュメントの読み込み完了を待つ
        if (!checkDocumentReady()) {
          await new Promise<void>(resolve => {
            const onLoad = () => resolve();
            window.addEventListener('load', onLoad, { once: true });
          });
        }
        
        console.log('ドキュメント読み込み完了');
        
        // 画像のプリロード
        await preloadImages();
        
        // ローディング状態を解除
        setLoading(false);
        
        // アニメーションの準備が整うまで少し待つ
        setTimeout(() => {
          setAnimationsReady(true);
          // ScrollTriggerを確実に更新
          ScrollTrigger.refresh(true);
          console.log('アニメーション準備完了');
        }, isMobile ? 300 : 200);
      };
      
      // リソース読み込み開始
      loadAllResources().catch(error => {
        console.error('リソース読み込み中にエラーが発生:', error);
        // エラーが発生しても進める
        setLoading(false);
        setTimeout(() => setAnimationsReady(true), 200);
      });
      
      // クリーンアップ関数
      return () => {
        // 必要に応じてイベントリスナーをクリーンアップ
      };
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
              dispatchSection({ 
                type: 'SET_SECTION', 
                payload: { index: 1 }
              });
            }
            if (index === 1) {
              dispatchSection({ 
                type: 'SET_SECTION', 
                payload: { index: 2 }
              });
            }
          },
          onLeaveBack: () => {
            if (index === 0) {
              dispatchSection({ 
                type: 'SET_SECTION', 
                payload: { index: 0 }
              });
            }
            if (index === 1) {
              dispatchSection({ 
                type: 'SET_SECTION', 
                payload: { index: 1 }
              });
            }
          },
          onUpdate: (self) => {
            // フェードエフェクト
            const fadeProgress = self.progress;
            const newOpacity = fadeProgress < 0.5 
              ? 1 - fadeProgress * 2 
              : (fadeProgress - 0.5) * 2;
              
            dispatchSection({ 
              type: 'UPDATE_OPACITY', 
              payload: newOpacity 
            });
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
      <LoadingScreen loading={loading} animationsReady={animationsReady} />

      <CircleTransition colors={colors} setCircleRef={setCircleRef} />

      {!loading && animationsReady && (
        <>
          {content.map((item, index) => (
            <ContentSection
              key={index}
              {...item}
              opacity={sectionState.currentIndex === index ? sectionState.opacity : 0}
              isActive={sectionState.activeSection === index}
            />
          ))}
        </>
      )}
    </div>
  );
}
