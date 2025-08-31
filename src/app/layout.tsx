import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
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
    <html lang="ja" className={bricolageGrotesque.className}>
      <body className={"antialiased min-h-screen flex flex-col relative"}>
        <Header />
        <main className="flex-grow z-10 relative">{children}</main>
      </body>
    </html>
  );
}
