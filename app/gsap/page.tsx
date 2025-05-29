"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useReducer, useRef, useState } from "react";

// 分割したコンポーネントをインポート
import {
  CircleTransition,
  LoadingScreen,
  Section1,
  Section2,
  Section3,
} from "./components";
import { breakpoints } from "./styles";

const colors = ["white", "black", "green"];

// セクションコンポーネントの配列
const sectionComponents = [Section1, Section2, Section3];

// 画像のURLを配列として定義
const images = [
  "https://picsum.photos/800/400?random=1",
  "https://picsum.photos/800/400?random=2",
  "https://picsum.photos/800/400?random=3",
];

// セクション状態を管理するreducer
const sectionReducer = (state, action) => {
  switch (action.type) {
    case "SET_SECTION":
      return {
        ...state,
        currentIndex: action.payload.index,
        activeSection: action.payload.index,
        isAnimating: false,
        progress: 0,
      };
    case "ANIMATION_START":
      return {
        ...state,
        isAnimating: true,
      };
    case "ANIMATION_COMPLETE":
      return {
        ...state,
        isAnimating: false,
      };
    case "ANIMATION_PROGRESS":
      return {
        ...state,
        progress: action.payload.progress,
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
    isAnimating: false,
    progress: 0,
  });

  const [loading, setLoading] = useState(true);
  const [animationsReady, setAnimationsReady] = useState(false); // アニメーションの準備状態を追跡
  const [isMobile, setIsMobile] = useState(false); // モバイルデバイスかどうかを追跡

  const containerRef = useRef(null);
  const circlesRef = useRef([]);

  // モバイルデバイスかどうかをチェックする関数
  const checkIfMobile = useCallback(() => {
    if (typeof window !== "undefined") {
      return (
        /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ||
        window.innerWidth < breakpoints.mobile
      );
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

  // 前回のスクロール位置を記憶する参照
  const prevScrollY = useRef(0);

  // 円の参照を設定するための関数
  const setCircleRef = (el, index) => {
    circlesRef.current[index] = el;
  };

  // スクロール位置の監視関数
  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    // スクロール位置の計算
    const scrollY = window.scrollY;
    const scrollHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollY / scrollHeight;

    // デバッグ用ログ出力（スクロール0～100%の間で50ログ以下に制限）
    // セクションの切り替わり付近のスクロール位置を推定
    const section1Threshold = 0.33; // 第1セクションから第2セクションへの切り替わり付近
    const section2Threshold = 0.66; // 第2セクションから第3セクションへの切り替わり付近

    // スクロール位置を最大50区間に分割し、区間が変わった時のみログを出力
    const totalLogPoints = 50; // スクロール全体での最大ログ数
    const currentLogPoint = Math.floor(scrollPercentage * totalLogPoints);
    const previousLogPoint = Math.floor(
      (prevScrollY.current / scrollHeight) * totalLogPoints,
    );

    // 区間が変わった場合、またはセクション切り替わり付近の場合のみログを出力
    if (
      currentLogPoint !== previousLogPoint ||
      (scrollPercentage > section1Threshold - 0.03 &&
        scrollPercentage < section1Threshold + 0.03) ||
      (scrollPercentage > section2Threshold - 0.03 &&
        scrollPercentage < section2Threshold + 0.03)
    ) {
      console.log(
        `スクロール: ${scrollY.toFixed(0)}px, ${(scrollPercentage * 100).toFixed(2)}%, セクション: ${sectionState.currentIndex}`,
      );

      // 各セクションのOpacityをログ出力
      const section1El = document.querySelector('[data-section="1"]');
      const section2El = document.querySelector('[data-section="2"]');
      const section3El = document.querySelector('[data-section="3"]');

      if (section1El || section2El || section3El) {
        const section1Opacity = section1El
          ? getComputedStyle(section1El).opacity
          : "N/A";
        const section2Opacity = section2El
          ? getComputedStyle(section2El).opacity
          : "N/A";
        const section3Opacity = section3El
          ? getComputedStyle(section3El).opacity
          : "N/A";

        console.log(
          `セクションOpacity - 1: ${section1Opacity}, 2: ${section2Opacity}, 3: ${section3Opacity}`,
        );
      }
    }

    prevScrollY.current = scrollY;
  }, [sectionState.currentIndex]);

  // 画像のプリロード関数
  const preloadImages = useCallback(async () => {
    try {
      console.log("画像のプリロード開始");
      const imagePromises = images.map((imgSrc, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`画像読み込み完了: ${index + 1}/${images.length}`);
            resolve(undefined);
          };
          img.onerror = (err) => {
            console.error(`画像読み込みエラー: ${imgSrc}`, err);
            reject(err);
          };
          img.src = imgSrc;
        });
      });

      await Promise.all(imagePromises);
      console.log("全ての画像のプリロード完了");
      return true;
    } catch (error) {
      console.error("画像プリロード中にエラーが発生:", error);
      return false;
    }
  }, []);

  // スクロールイベントリスナーの設定
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  // GSAPの初期化とリソース読み込み
  useEffect(() => {
    // クライアントサイドでのみ実行
    if (typeof window !== "undefined") {
      // GSAPプラグインを登録と設定
      gsap.registerPlugin(ScrollTrigger);

      // モバイル用の設定
      ScrollTrigger.config({
        ignoreMobileResize: true, // モバイルのリサイズイベントを無視
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load", // 自動更新するイベントを限定
      });

      // ドキュメントの読み込み完了を監視
      const checkDocumentReady = () => {
        return document.readyState === "complete";
      };

      // 全てのリソースの読み込みを待つ
      const loadAllResources = async () => {
        // ドキュメントの読み込み完了を待つ
        if (!checkDocumentReady()) {
          await new Promise<void>((resolve) => {
            const onLoad = () => resolve();
            window.addEventListener("load", onLoad, { once: true });
          });
        }

        console.log("ドキュメント読み込み完了");

        // 画像のプリロード
        await preloadImages();

        // ローディング状態を解除
        setLoading(false);

        // アニメーションの準備が整うまで少し待つ
        setTimeout(
          () => {
            setAnimationsReady(true);
            // ScrollTriggerを確実に更新
            ScrollTrigger.refresh(true);
            console.log("アニメーション準備完了");
          },
          isMobile ? 300 : 200,
        );
      };

      // リソース読み込み開始
      loadAllResources().catch((error) => {
        console.error("リソース読み込み中にエラーが発生:", error);
        // エラーが発生しても進める
        setLoading(false);
        setTimeout(() => setAnimationsReady(true), 200);
      });

      // クリーンアップ関数
      return () => {
        // 必要に応じてイベントリスナーをクリーンアップ
      };
    }
  }, [isMobile, preloadImages]);

  // アニメーションの設定
  useEffect(() => {
    // クライアントサイドでのみ実行、かつローディングが完了していてアニメーション準備完了後
    if (typeof window === "undefined" || loading || !animationsReady) return;

    console.log("GSAP Animation Setup");

    // ScrollTriggerの設定をクリア
    for (const trigger of ScrollTrigger.getAll()) {
      trigger.kill();
    }
    // bodyが完全に表示されるように
    gsap.to("body", { duration: 0.3, opacity: 1, ease: "power1.out" });

    // 画面のサイズに基づいて最大半径を計算
    const diagonal = Math.sqrt(
      window.innerWidth ** 2 + window.innerHeight ** 2,
    );

    // モバイル用の設定を調整
    const scrollSettings = {
      scrub: isMobile ? 1 : 0.5,
      preventOverlaps: true,
      fastScrollEnd: true,
    };

    const sectionCount = sectionComponents.length;
    const sectionPercentage = 100 / sectionCount;

    // *** 初期状態設定 ***
    const sections = containerRef.current?.querySelectorAll(
      "[data-section-index]",
    );
    sections?.forEach((section, idx) => {
      gsap.set(section, { opacity: idx === 0 ? 1 : 0 }); // 最初のセクションのみ表示
    });
    for (const circle of circlesRef.current) {
      if (circle) gsap.set(circle, { attr: { r: 0 } }); // 円を初期化
    }

    // 各セクションの間のアニメーションを設定
    colors.slice(1).forEach((_, index) => {
      const circle = circlesRef.current[index];
      if (!circle) return;

      const currentSectionIndex = index;
      const nextSectionIndex = index + 1;
      // data-section-index属性を使って要素を取得
      const currentSectionEl = containerRef.current?.querySelector(
        `[data-section-index="${currentSectionIndex}"]`,
      );
      const nextSectionEl = containerRef.current?.querySelector(
        `[data-section-index="${nextSectionIndex}"]`,
      );

      // セクションの開始と終了位置を動的に計算
      const startPosition = `${index * sectionPercentage}% top`;
      const endPosition = `${(index + 1) * sectionPercentage}% top`;

      // スクロールに連動したタイムラインを作成
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: startPosition,
          end: endPosition,
          scrub: scrollSettings.scrub,
          preventOverlaps: scrollSettings.preventOverlaps,
          fastScrollEnd: scrollSettings.fastScrollEnd,
          onEnter: () => {
            // 次のセクションインデックスを計算して状態を更新
            if (nextSectionIndex < sectionCount) {
              dispatchSection({
                type: "SET_SECTION",
                payload: { index: nextSectionIndex },
              });
            }
          },
          onLeaveBack: () => {
            // 前のセクションインデックスを計算して状態を更新
            if (currentSectionIndex >= 0) {
              dispatchSection({
                type: "SET_SECTION",
                payload: { index: currentSectionIndex },
              });
            }
          },
        },
      });

      // アニメーションシーケンスをタイムラインに追加
      if (currentSectionEl) {
        // 現在のセクションをフェードアウト (タイムラインの0% -> 40%)
        timeline.to(
          currentSectionEl,
          { opacity: 0, ease: "power1.in", duration: 0.4 },
          0,
        );
      }
      // 円を拡大 (タイムラインの0% -> 100%)
      timeline.to(
        circle,
        { attr: { r: diagonal }, ease: "none", duration: 1 },
        0,
      );
      if (nextSectionEl) {
        // 次のセクションをフェードイン (タイムラインの60% -> 100%)
        timeline.fromTo(
          nextSectionEl,
          { opacity: 0 },
          { opacity: 1, ease: "power1.out", duration: 0.4 },
          0.6,
        );
      }

      // タイムラインのイベントコールバック
      timeline.eventCallback("onStart", () =>
        dispatchSection({ type: "ANIMATION_START" }),
      );
      timeline.eventCallback("onUpdate", function () {
        dispatchSection({
          type: "ANIMATION_PROGRESS",
          payload: { progress: this.progress() },
        });
      });
      timeline.eventCallback("onComplete", () =>
        dispatchSection({ type: "ANIMATION_COMPLETE", payload: { index } }),
      );
    });

    // 全ての設定後にScrollTriggerを再計算
    ScrollTrigger.refresh(true);

    // ウィンドウリサイズ時の処理
    const handleResize = () => {
      // ScrollTriggerを更新
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", handleResize);

    // クリーンアップ関数
    return () => {
      window.removeEventListener("resize", handleResize);
      // コンポーネントアンマウント時にScrollTriggerインスタンスを破棄
      for (const trigger of ScrollTrigger.getAll()) {
        trigger.kill();
      }
    };
    // 依存配列に loading, animationsReady, isMobile を追加
  }, [loading, animationsReady, isMobile]);

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

      {!loading &&
        animationsReady &&
        sectionComponents.map((SectionComponent, index) => (
          <SectionComponent key={SectionComponent.name} index={index} />
        ))}
    </div>
  );
}
