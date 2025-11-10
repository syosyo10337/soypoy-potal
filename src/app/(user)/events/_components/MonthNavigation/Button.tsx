import { ArrowLeftIcon, ArrowRightIcon } from "./assets";

interface MonthNavigationButtonProps {
  onClick: () => void;
}

function PreviousMonthButton({ onClick }: MonthNavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-soypoy-accent"
      aria-label="前月へ"
    >
      <ArrowLeftIcon />
    </button>
  );
}
function NextMonthButton({ onClick }: MonthNavigationButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-12 h-12 rounded-full bg-soypoy-accent"
      aria-label="次月へ"
    >
      <ArrowRightIcon />
    </button>
  );
}

export { PreviousMonthButton, NextMonthButton };
