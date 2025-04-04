"use client";

import Layout from "../components/Layout";

const events = [
  {
    id: 1,
    title: "ジャズナイト",
    date: "2024年4月15日",
    time: "19:00 - 22:00",
    description: "地元ミュージシャンによるライブジャズパフォーマンスをお楽しみください。",
  },
  {
    id: 2,
    title: "ワインテイスティング",
    date: "2024年4月20日",
    time: "18:00 - 21:00",
    description: "世界各国のワインを楽しみながら、ソムリエから醸造プロセスやテイスティングのコツを学びましょう。",
  },
  {
    id: 3,
    title: "アートワークショップ",
    date: "2024年4月27日",
    time: "14:00 - 17:00",
    description: "地元アーティストによる水彩画のワークショップ。初心者から上級者まで参加できます。",
  },
  {
    id: 4,
    title: "オープンマイクナイト",
    date: "2024年5月5日",
    time: "20:00 - 23:00",
    description: "詩、音楽、スタンドアップコメディなど、あなたの才能を披露する夜。参加自由です。",
  },
];

export default function EventsPage() {
  return (
    <Layout>
      <div className="min-h-screen pt-36 pb-16 px-6 bg-black">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white">EVENTS</h1>

          <div className="grid grid-cols-1 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-gray-900 rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2 text-white">{event.title}</h2>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                  </div>
                  <p className="text-gray-300 mb-6">{event.description}</p>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
                  >
                    詳細を見る
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
