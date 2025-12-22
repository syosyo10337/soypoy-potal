import { CircularNavigationButton } from "@/components/CircularNavigationButton";

interface MonthNavigationButtonProps {
  onClick: () => void;
}

function PreviousMonthButton({ onClick }: MonthNavigationButtonProps) {
  return (
    <CircularNavigationButton
      onClick={onClick}
      direction="prev"
      ariaLabel="前月へ"
      size="sm"
    />
  );
}

function NextMonthButton({ onClick }: MonthNavigationButtonProps) {
  return (
    <CircularNavigationButton
      onClick={onClick}
      direction="next"
      ariaLabel="次月へ"
      size="sm"
    />
  );
}

export { PreviousMonthButton, NextMonthButton };
