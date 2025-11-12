"use client";
import { type RefObject, useEffect, useState } from "react";

export interface ItemPosition {
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

// TODO: understand this code
function calculateRowLayout(
  items: HTMLDivElement[],
  threshold: number,
): { positions: Record<number, ItemPosition>; hasMultipleRows: boolean } {
  if (items.length === 0) {
    return { positions: {}, hasMultipleRows: false };
  }

  const positions: Record<number, ItemPosition> = {};
  let currentRow = 0;
  let currentTop = items[0].offsetTop;
  let previousIndex = 0;
  let lastRowStartIndex = 0;

  items.forEach((item, index) => {
    const itemTop = item.offsetTop;
    const isNewRow = Math.abs(itemTop - currentTop) > threshold;

    if (isNewRow) {
      positions[previousIndex] = {
        row: currentRow,
        isLastInRow: true,
        isInLastRow: false,
      };
      currentRow++;
      currentTop = itemTop;
      lastRowStartIndex = index;
    }

    positions[index] = {
      row: currentRow,
      isLastInRow: false,
      isInLastRow: false,
    };

    previousIndex = index;
  });

  if (items.length > 0) {
    positions[previousIndex] = {
      ...positions[previousIndex],
      isLastInRow: true,
      isInLastRow: true,
    };

    const hasMultipleRows = currentRow > 0;
    const startIndex = hasMultipleRows ? lastRowStartIndex : 0;
    for (let i = startIndex; i <= previousIndex; i++) {
      positions[i] = {
        ...positions[i],
        isInLastRow: true,
      };
    }
  }

  return { positions, hasMultipleRows: currentRow > 0 };
}

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
