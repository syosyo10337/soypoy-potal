"use client";

import Link from "next/link";

export default function AccessSection() {
  return (
    <section id="access" className="section-full-height flex items-center justify-center relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Access
        </h2>

        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* 地図 */}
          <div className="w-full md:w-1/2 h-[400px] rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3241.573630504103!2d139.66509847550185!3d35.662875072593145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f3a985c43219%3A0xef11c14b0d78af2f!2sSOY-POY!5e0!3m2!1sja!2sjp!4v1743784454205!5m2!1sja!2sjp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className=""
            ></iframe>
          </div>

          {/* 店舗情報 */}
          <div className="w-full md:w-1/2 text-white">
            <h3 className="text-2xl font-bold mb-4">
              yosemic PUB SOY-POY{" "}
              <span className="text-lg font-normal">[ロバート下北沢]</span>
            </h3>

            <div className="mb-6">
              <p className="text-lg mb-1">〒155-0031</p>
              <p className="text-lg mb-4">
                東京都世田谷区北沢２丁目３０−１４ 重宗ビル 3F
              </p>

              <div className="border-l-4 border-[#00c896] pl-4 py-2">
                <p className="mb-2">Friday〜Sunday</p>
                <p className="mb-2">OPEN 19:00 CLOSE 24:00</p>
                <p>※金曜日のみOPEN 19:30</p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/8H5FQCwcV2UpB1nUA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#00c896] hover:bg-[#00a57d] text-black font-bold py-3 px-8 rounded-full transition-colors duration-300"
            >
              Google Mapで見る
            </a>
          </div>
        </div>
      </div>

      {/* トップに戻るスクロール矢印 */}
      <Link href="#hero" className="scroll-arrow z-30">
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
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </Link>
    </section>
  );
}
