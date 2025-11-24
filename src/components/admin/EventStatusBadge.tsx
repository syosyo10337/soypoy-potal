import type { ComponentProps } from "react";
import { Badge } from "@/components/shadcn/badge";
import { cn } from "@/utils/cn";

/**
 * EventStatusBadgeのバリアント型
 */
export type EventStatusVariant = "published" | "draft" | "archived";

/**
 * ステータスバリアントごとのラベルマッピング
 */
const statusLabels: Record<EventStatusVariant, string> = {
  published: "公開中",
  draft: "下書き",
  archived: "アーカイブ",
} as const;

/**
 * ステータスバリアントごとのBadgeバリアントマッピング
 */
const statusBadgeVariants: Record<
  EventStatusVariant,
  ComponentProps<typeof Badge>["variant"]
> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
} as const;

export interface EventStatusBadgeProps {
  variant: EventStatusVariant;
  className?: string;
}

/**
 * イベントのステータスバッジ
 *
 * PublicationStatusと1:1で対応するvariantを受け取り、
 * 適切なBadgeスタイルとラベルを表示
 *
 * @example
 * <EventStatusBadge variant="published" />
 * <EventStatusBadge variant="draft" />
 * <EventStatusBadge variant="archived" />
 */
export function EventStatusBadge({
  variant,
  className,
}: EventStatusBadgeProps) {
  return (
    <Badge variant={statusBadgeVariants[variant]} className={cn(className)}>
      {statusLabels[variant]}
    </Badge>
  );
}
