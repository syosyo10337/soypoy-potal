import type { ComponentProps } from "react";
import { Badge } from "@/components/shadcn/badge";
import { eventPublicationStatusLabel } from "@/constant/eventPublicationStatusLabel";
import type { PublicationStatus } from "@/domain/entities";
import { cn } from "@/utils/cn";

/**
 * EventStatusBadgeのバリアント型
 */
export type EventStatusVariant = PublicationStatus;

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
      {eventPublicationStatusLabel[variant]}
    </Badge>
  );
}
