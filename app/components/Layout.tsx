"use client";

import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
