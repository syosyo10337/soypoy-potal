import { Bricolage_Grotesque, Noto_Sans_JP } from "next/font/google";
import localFont from "next/font/local";

export const anymale = localFont({
  src: "./anymale/AnyMale.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-anymale",
  display: "swap",
});

export const bernardMT = localFont({
  src: "./bernard/BernardMTCondensed.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-bernard-mt",
  display: "swap",
});

export const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});
