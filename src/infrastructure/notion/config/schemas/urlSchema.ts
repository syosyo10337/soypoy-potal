import { z } from "zod";

export const UrlSchema = z
  .string()
  .url("有効なURL形式である必要があります")
  .or(z.literal(""));

export type Url = z.infer<typeof UrlSchema>;
