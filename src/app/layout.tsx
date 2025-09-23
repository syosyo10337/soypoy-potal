import type { Metadata } from "next";
import { Bricolage_Grotesque, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { anymale, bernardMT } from "../../lib/fonts";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
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

const fontClasses = `${bricolageGrotesque.variable} ${notoSansJP.variable} ${anymale.variable} ${bernardMT.variable}`;

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html lang="ja" className={fontClasses}>
      <body
        className={
          "antialiased min-h-screen flex flex-col relative font-noto-sans-jp"
        }
      >
        <Header />
        <main className="flex-grow z-10 relative">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
