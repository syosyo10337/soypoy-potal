"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navItems = [
  { name: "ABOUT", href: "/about" },
  { name: "MEMBERS", href: "/members" },
  { name: "EVENTS", href: "/events" },
  { name: "CONTACT", href: "/contact" },
];

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  // メニューが開いているときに背景のスクロールを防止
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      {/* ハンバーガーメニューボタン */}
      <button
        type="button"
        aria-label={isOpen ? "メニューを閉じる" : "メニューを開く"}
        onClick={() => setIsOpen(!isOpen)}
        className="text-white z-[9999] relative p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
          aria-hidden="true"
        > 
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      {/* モバイルメニュー */}
      {isOpen && (
        <>
          {/* 背景オーバーレイ */}
          <div style={{ backgroundColor: '#000000', opacity: 1 }} className="fixed inset-0 z-[9998]" />

          {/* メニューコンテンツ */}
          <div style={{ backgroundColor: '#000000', opacity: 1 }} className="fixed inset-0 z-[9999] flex flex-col h-full">
            {/* ヘッダー部分 - 閉じるボタンのみ */}
            <div className="flex justify-end items-center p-4 border-b border-gray-800">
              <button
                type="button"
                aria-label="メニューを閉じる"
                onClick={() => setIsOpen(false)}
                className="text-white p-1"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* メニュー項目 - スクロールなしに全体を表示 */}
            <nav className="flex-1 flex items-center justify-center">
              <ul className="w-full">
                {navItems.map((item) => (
                  <li key={item.name} className="border-b border-gray-800 last:border-b-0">
                    <Link
                      href={item.href}
                      className="block text-white text-2xl font-zen-old-mincho hover:bg-gray-800 transition-all px-8 py-6 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </>
      )}
    </div>
  );
}
