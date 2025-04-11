"use client";

import { z } from "zod";
// import Button from "../components/Button";

// Zod スキーマ定義
// const contactSchema = z.object({
//   name: z.string().min(2, "名前は2文字以上入力してください"),
//   email: z.string().email("有効なメールアドレスを入力してください"),
//   message: z.string().min(10, "メッセージは10文字以上入力してください"),
// });

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">
        CONTACT
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white">
              お問い合わせ
            </h2>
            <p className="text-gray-300">
              ご質問、ご提案、予約のリクエストなど、お気軽にお問い合わせください。
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-2 text-white">住所</h3>
              <p className="text-gray-300">
                東京都渋谷区代々木1-2-3
                <br />
                SOY-POYビル 1階
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-white">
                営業時間
              </h3>
              <p className="text-gray-300">
                火曜日 〜 日曜日: 17:00 - 24:00
                <br />
                月曜日: 定休日
              </p>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-white">
                お問い合わせ先
              </h3>
              <p className="text-gray-300">
                メール: info@soy-poy.jp
                <br />
                電話: 03-1234-5678
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-6 text-white">
            メッセージを送る
          </h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                お名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                メッセージ
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-4 py-2 bg-gray-800/80 border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            >
              送信する
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
