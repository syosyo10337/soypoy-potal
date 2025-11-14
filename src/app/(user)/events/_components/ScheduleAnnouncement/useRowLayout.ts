"use client";
import { type RefObject, useEffect, useState } from "react";

interface ItemPosition {
  row: number;
  isLastInRow: boolean;
  isInLastRow: boolean;
}
interface UseRowLayoutOptions {
  threshold?: number;
  itemSelector?: string;
}

const DEFAULT_THRESHOLD = 5;
const DEFAULT_ITEM_SELECTOR = "[data-calendar-item]";

export function useRowLayout(
  containerRef: RefObject<HTMLDivElement | null>,
  {
    threshold = DEFAULT_THRESHOLD,
    itemSelector = DEFAULT_ITEM_SELECTOR,
  }: UseRowLayoutOptions = {},
) {
  const [itemPositions, setItemPositions] = useState<
    Record<number, ItemPosition>
  >({});
  const [hasMultipleRows, setHasMultipleRows] = useState(false);

  useEffect(() => {
    const updateLayout = () => {
      if (!containerRef.current) return;

      const items = Array.from(
        containerRef.current.querySelectorAll<HTMLDivElement>(itemSelector),
      );

      const { positions, hasMultipleRows: multipleRows } = calculateRowLayout(
        items,
        threshold,
      );

      setItemPositions(positions);
      setHasMultipleRows(multipleRows);
    };

    updateLayout();

    const resizeObserver = new ResizeObserver(() => {
      updateLayout();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [containerRef, threshold, itemSelector]);

  return { itemPositions, hasMultipleRows };
}

/** TODO ロジック見直し */
function calculateRowLayout(
  items: HTMLDivElement[],
  threshold: number,
): { positions: Record<number, ItemPosition>; hasMultipleRows: boolean } {
  if (items.length === 0) {
    return { positions: {}, hasMultipleRows: false };
  }

  const positions: Record<number, ItemPosition> = {};
  const state = {
    currentRow: 0,
    currentTop: items[0].offsetTop,
    lastProcessedIndex: 0,
    lastRowStartIndex: 0,
  };

  items.forEach((item, index) => {
    const itemTop = item.offsetTop;
    const isNewRow = Math.abs(itemTop - state.currentTop) > threshold;

    if (isNewRow) {
      positions[state.lastProcessedIndex] = {
        row: state.currentRow,
        isLastInRow: true,
        isInLastRow: false,
      };
      state.currentRow++;
      state.currentTop = itemTop;
      state.lastRowStartIndex = index;
    }

    positions[index] = {
      row: state.currentRow,
      isLastInRow: false,
      isInLastRow: false,
    };

    state.lastProcessedIndex = index;
  });

  if (items.length > 0) {
    const startIndex = state.currentRow > 0 ? state.lastRowStartIndex : 0;
    for (let i = startIndex; i <= state.lastProcessedIndex; i++) {
      positions[i] = {
        ...positions[i],
        isInLastRow: true,
        isLastInRow: i === state.lastProcessedIndex,
      };
    }
  }

  return { positions, hasMultipleRows: state.currentRow > 0 };
}
