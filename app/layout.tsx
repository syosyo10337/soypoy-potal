import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import { storyblokInit, apiPlugin } from "@storyblok/react";

// Storyblokの初期化
storyblokInit({
  accessToken: process.env.STORYBLOK_API_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: 'eu',
  },
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 明朝体フォントの追加
const zenOldMincho = Zen_Old_Mincho({
  weight: ['400', '700'],
  variable: "--font-zen-old-mincho",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "SOY-POY | Community Bar",
  description: "SOY-POY is a community bar where people gather, connect and share experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zenOldMincho.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
