import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * ウィンドウサイズがモバイル（768px未満）かどうかを判定するフック
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
