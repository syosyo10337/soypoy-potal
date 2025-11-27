import { PublicationStatus } from "@/domain/entities";

export const eventPublicationStatusLabel = {
  [PublicationStatus.Draft]: "下書き",
  [PublicationStatus.Published]: "公開中",
  [PublicationStatus.Archived]: "アーカイブ",
} as const;
