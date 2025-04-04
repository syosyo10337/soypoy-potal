"use client";

import Layout from "./components/Layout";
import HeroSection from "./components/HeroSection";
import EventSection from "./components/EventSection";
import AboutSection from "./components/AboutSection";
import AccessSection from "./components/AccessSection";
import Link from "next/link";

export default function Home() {
  return (
    <Layout fullWidth>
      <main className="relative">
        <section id="hero" className="relative">
          <HeroSection />
          {/* ヒーローセクションの矢印 */}
          <Link href="#events" className="scroll-arrow z-30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </section>
        <EventSection />
        <AboutSection />
        <AccessSection />
      </main>
    </Layout>
  );
}
