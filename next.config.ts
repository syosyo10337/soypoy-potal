import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // そもそもbiomeでのlintをしているため、eslintは無効化
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        //NOTE: Notionからデータを取ってくるため。
        hostname: "prod-files-secure.s3.us-west-2.amazonaws.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
