import type { DayPicker } from "react-day-picker";
import type { Button } from "@/components/shadcn/button";

/**
 * Shadcn CalendarのPropsのエイリアス
 */
type ShadcnCalendarProps = React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>["variant"];
};

/**
 * カスタムCalendarでISO文字列ベースでやり取りするためのProps
 */
export interface ISODateCalendarProps {
  /**
   * 選択された日付（ISO文字列）
   */
  selected?: string | string[];

  /**
   * 日付選択時のコールバック（ISO文字列を返す）
   */
  onSelect?: (date: string | string[] | undefined) => void;

  /**
   * デフォルトの月（ISO文字列）
   */
  defaultMonth?: string;

  /**
   * 現在の月（ISO文字列）
   */
  month?: string;

  /**
   * 月変更時のコールバック（ISO文字列を返す）
   */
  onMonthChange?: (month: string) => void;
}

export type CustomCalendarProps = Omit<
  ShadcnCalendarProps,
  keyof ISODateCalendarProps
> &
  ISODateCalendarProps;
