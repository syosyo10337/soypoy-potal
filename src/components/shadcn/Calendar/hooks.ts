"use client";

import * as React from "react";
import {
  dateArrayToIsoArray,
  dateToIso,
  isoArrayToDateArray,
  isoToDate,
} from "@/utils/date";
import type { ISODateCalendarProps } from "./type";

interface UseCalendarAdapterProps {
  selected: ISODateCalendarProps["selected"];
  onSelect: ISODateCalendarProps["onSelect"];
  defaultMonth: ISODateCalendarProps["defaultMonth"];
  month: ISODateCalendarProps["month"];
  onMonthChange: ISODateCalendarProps["onMonthChange"];
  mode: "single" | "multiple" | "range";
}

interface UseCalendarAdapterReturn {
  dateSelected: Date | Date[] | undefined;
  dateDefaultMonth: Date | undefined;
  dateMonth: Date | undefined;
  handleSelect: (date: Date | Date[] | undefined) => void;
  handleMonthChange: (month: Date) => void;
}

/**
 * Calendarコンポーネント用のアダプターフック
 * ISO文字列とDateオブジェクトの変換を管理する
 * Form上ではISO文字列を利用し、CalendarコンポーネントではDateオブジェクトを利用する
 */
export function useCalendarAdapter({
  selected,
  onSelect,
  defaultMonth,
  month,
  onMonthChange,
  mode,
}: UseCalendarAdapterProps): UseCalendarAdapterReturn {
  // ISO文字列からDateオブジェクトへの変換
  const dateSelected = React.useMemo(() => {
    if (mode === "single") {
      return isoToDate(selected as string | undefined);
    }
    if (mode === "multiple") {
      return isoArrayToDateArray(selected as string[] | undefined);
    }
    // rangeモードの場合は、今回は未対応
    return undefined;
  }, [selected, mode]);

  const dateDefaultMonth = React.useMemo(
    () => isoToDate(defaultMonth),
    [defaultMonth],
  );

  const dateMonth = React.useMemo(() => isoToDate(month), [month]);

  // DateオブジェクトからISO文字列への変換を行うハンドラー
  const handleSelect = React.useCallback(
    (date: Date | Date[] | undefined) => {
      if (!onSelect) return;

      if (mode === "single") {
        onSelect(dateToIso(date as Date | undefined));
      } else if (mode === "multiple") {
        onSelect(dateArrayToIsoArray(date as Date[] | undefined));
      }
    },
    [onSelect, mode],
  );

  const handleMonthChange = React.useCallback(
    (month: Date) => {
      if (!onMonthChange) return;
      const iso = dateToIso(month);
      if (iso) {
        onMonthChange(iso);
      }
    },
    [onMonthChange],
  );

  return {
    dateSelected,
    dateDefaultMonth,
    dateMonth,
    handleSelect,
    handleMonthChange,
  };
}
