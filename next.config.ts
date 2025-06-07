import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // そもそもbiomeでのlintをしているため、eslintは無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Storyblokのドメインを許可
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.storyblok.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
};

export default nextConfig;
