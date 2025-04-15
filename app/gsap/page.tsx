"use client";

import { useEffect, useRef, useCallback, useReducer, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// 分割したコンポーネントをインポート
import {
  CircleTransition,
  LoadingScreen,
  Section1,
  Section2,
  Section3
} from "./components";
import { breakpoints } from "./styles";

const colors = ["white", "black", "green"];

// セクションコンポーネントの配列
const sectionComponents = [
  Section1,
  Section2,
  Section3
];

// 画像のURLを配列として定義
const images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3"
];

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
    case 'ANIMATION_COMPLETE':
      // アニメーション完了時の状態更新
      return {
        ...state,
        animationComplete: action.payload.index,
        contentVisibility: true,
        animationProgress: 1.0 // アニメーション進行度を100%に設定
      };
    case 'ANIMATION_PROGRESS':
      // アニメーション進行度の更新
      return {
        ...state,
        animationProgress: action.payload.progress,
        contentVisibility: action.payload.progress > 0.7 // 70%以上で表示
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
      const imagePromises = images.map((imgSrc, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`画像読み込み完了: ${index + 1}/${images.length}`);
            resolve();
          };
          img.onerror = (err) => {
            console.error(`画像読み込みエラー: ${imgSrc}`, err);
            reject(err);
          };
          img.src = imgSrc;
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

    // セクションの数を取得
    const sectionCount = sectionComponents.length;
    // 各セクションの割合を計算
    const sectionPercentage = 100 / sectionCount;

    // 各セクションのアニメーションを設定
    colors.slice(1).forEach((_, index) => {
      const circle = circlesRef.current[index];
      if (!circle) return;

      // 初期状態では円を非表示に
      gsap.set(circle, { attr: { r: 0 } });

      // セクションの開始と終了位置を動的に計算
      const startPosition = `${index * sectionPercentage}% top`;
      const endPosition = `${(index + 1) * sectionPercentage}% top`;

      // スクロールに連動したアニメーション
      gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: startPosition,
          end: endPosition,
          scrub: scrollSettings.scrub,
          preventOverlaps: scrollSettings.preventOverlaps,
          fastScrollEnd: scrollSettings.fastScrollEnd,
          onEnter: () => {
            // 次のセクションインデックスを計算
            const nextSectionIndex = index + 1;
            // 有効なセクションインデックスかチェック
            if (nextSectionIndex < sectionCount) {
              dispatchSection({
                type: 'SET_SECTION',
                payload: { index: nextSectionIndex }
              });
            }
          },
          onLeaveBack: () => {
            // 前のセクションインデックスを計算
            const prevSectionIndex = index;
            // 有効なセクションインデックスかチェック
            if (prevSectionIndex >= 0) {
              dispatchSection({
                type: 'SET_SECTION',
                payload: { index: prevSectionIndex }
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
        duration: 1,
        onStart: function() {
          // 円のアニメーション開始時のログ
          const scrollY = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          const scrollPercentage = (scrollY / scrollHeight * 100).toFixed(2);
          console.log(`円[${index}]アニメーション開始 - セクション: ${sectionState.currentIndex}, スクロール: ${scrollPercentage}%`);
        },
        onComplete: function() {
          // アニメーション完了時に状態を更新
          dispatchSection({
            type: 'ANIMATION_COMPLETE',
            payload: { index: index }
          });

          // 円のアニメーション終了時のログ
          const scrollY = window.scrollY;
          const scrollHeight = document.body.scrollHeight - window.innerHeight;
          const scrollPercentage = (scrollY / scrollHeight * 100).toFixed(2);
          console.log(`円[${index}]アニメーション終了 - セクション: ${sectionState.currentIndex}, スクロール: ${scrollPercentage}%`);
        },
        onUpdate: function() {
          // アニメーション進行度を状態に反映
          const progress = this.progress();
          dispatchSection({
            type: 'ANIMATION_PROGRESS',
            payload: { progress: progress }
          });

          // 円のアニメーション進行中のログ (25%, 50%, 75%の時のみ)
          if (Math.round(progress * 4) / 4 === 0.25 || Math.round(progress * 4) / 4 === 0.5 || Math.round(progress * 4) / 4 === 0.75) {
            const scrollY = window.scrollY;
            const scrollHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercentage = (scrollY / scrollHeight * 100).toFixed(2);
            console.log(`円[${index}]アニメーション${(progress * 100).toFixed(0)}% - セクション: ${sectionState.currentIndex}, スクロール: ${scrollPercentage}%`);
          }
        }
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
  }, [loading, isMobile, sectionState.currentIndex]);

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
          {sectionComponents.map((SectionComponent, index) => (
            <SectionComponent
              key={index}
              opacity={sectionState.currentIndex === index ? sectionState.opacity : 0}
              isActive={sectionState.activeSection === index}
              sectionState={sectionState}
              index={index}
            />
          ))}
        </>
      )}
    </div>
  );
}
