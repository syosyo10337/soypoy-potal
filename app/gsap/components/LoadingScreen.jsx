"use client";

import { zIndexes, layout } from "../styles";

/**
 * ローディング画面コンポーネント
 * @param {Object} props
 * @param {boolean} props.loading - ローディング中かどうか
 * @param {boolean} props.animationsReady - アニメーションの準備ができているかどうか
 */
const LoadingScreen = ({ loading, animationsReady }) => {
  if (!loading && animationsReady) return null;
  
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: layout.fullViewport.width,
        height: layout.fullViewport.height,
        backgroundColor: "white",
        color: "black",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        zIndex: zIndexes.loading,
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
  );
};

export default LoadingScreen;
