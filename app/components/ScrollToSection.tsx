"use client";

interface ScrollToSectionProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  duration?: number;
  offset?: number;
}

export default function ScrollToSection({
  targetId,
  children,
  className = "",
  duration = 300,
  offset = 0,
}: ScrollToSectionProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    function animation(currentTime: number) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // イージング関数（ease-in-out）
      const easeInOutCubic =
        progress < 0.5
          ? 4 * progress * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * easeInOutCubic);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  };

  return (
    <a href={`#${targetId}`} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
