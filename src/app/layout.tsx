import type { Metadata } from "next";
import { Geist, Geist_Mono, Zen_Old_Mincho } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { CacheProvider } from "./contexts/CacheContext";

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
  weight: ["400", "700"],
  variable: "--font-zen-old-mincho",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOY-POY | Community Bar",
  description:
    "SOY-POY is a community bar where people gather, connect and share experiences.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${zenOldMincho.variable} antialiased min-h-screen flex flex-col relative`}
      >
        <CacheProvider>
          <Header />
          <main className="flex-grow z-10 relative">{children}</main>
        </CacheProvider>
      </body>
    </html>
  );
}
