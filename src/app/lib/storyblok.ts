import { storyblokInit, apiPlugin } from "@storyblok/react";

// Storyblokを初期化する関数
export function initStoryblok() {
  storyblokInit({
    accessToken: process.env.STORYBLOK_API_TOKEN,
    use: [apiPlugin],
    apiOptions: {
      region: "eu", // APIリージョン
    },
  });
}
