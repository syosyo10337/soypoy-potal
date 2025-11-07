import type { Metadata } from "next";
import "@/assets/styles/globals.css";
import {
  anymale,
  bernardMT,
  bricolageGrotesque,
  notoSansJP,
  zenOldMincho,
} from "@/assets/fonts";
import { cn } from "@/utils/cn";

export const metadata: Metadata = {
  title: "SOY-POY | Community Bar",
  description:
    "SOY-POY is a community bar where people gather, connect and share experiences.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang="ja"
      className={cn(
        bricolageGrotesque.variable,
        notoSansJP.variable,
        anymale.variable,
        bernardMT.variable,
        zenOldMincho.variable,
      )}
    >
      <body
        className={
          "antialiased min-h-screen flex flex-col relative font-noto-sans-jp bg-soypoy-main"
        }
      >
        {children}
      </body>
    </html>
  );
}
