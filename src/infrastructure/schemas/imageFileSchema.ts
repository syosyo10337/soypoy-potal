import { z } from "zod";

export const imageFileSchema = z
  .file()
  .max(5 * 1024 * 1024, {
    message: "画像サイズは5MB以下にしてください",
  })
  .mime(["image/png", "image/jpeg"]);
