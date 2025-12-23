import { CircularNavigationButton } from "@/components/CircularNavigationButton";

interface HistoryNavigationButtonProps {
  onClick: () => void;
}

function PreviousHistoryButton({ onClick }: HistoryNavigationButtonProps) {
  return (
    <CircularNavigationButton
      onClick={onClick}
      direction="prev"
      ariaLabel="前へ"
      size="md"
    />
  );
}

function NextHistoryButton({ onClick }: HistoryNavigationButtonProps) {
  return (
    <CircularNavigationButton
      onClick={onClick}
      direction="next"
      ariaLabel="次へ"
      size="md"
    />
  );
}

export { PreviousHistoryButton, NextHistoryButton };
