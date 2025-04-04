"use client";

import Layout from "../components/Layout";
import Image from "next/image";

export default function AboutPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white">
          ABOUT US
        </h1>

        <div className="prose prose-lg prose-invert max-w-none">
          <p className="text-gray-300 text-lg mb-6">
            SOY-POYは、人々が集い、つながり、新しい体験を共有するコミュニティバーです。
            様々なバックグラウンドを持つ人々が集まる場所として、
            文化の交流や創造的な対話を促進することを目指しています。
          </p>

          <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                OUR VISION
              </h2>
              <p className="text-gray-300">
                多様なバックグラウンドを持つ人々が、互いを尊重しながら交流し、
                共に成長できるインクルーシブな空間を創造すること。
              </p>
            </div>

            <div className="bg-gray-900/70 backdrop-blur-sm p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                OUR MISSION
              </h2>
              <p className="text-gray-300">
                文化的な体験、芸術、食、飲み物を通じて人々をつなぎ、
                コミュニティの絆を強化する場を提供すること。
              </p>
            </div>
          </div>

          <p className="text-gray-300 text-lg mb-6">
            2023年の設立以来、SOY-POYは文化イベント、ワークショップ、展示会、
            そして単に友人と過ごすための居心地の良い空間として、
            多くの人々に親しまれてきました。
          </p>

          <p className="text-gray-300 text-lg">
            私たちは常に新しいアイデアやコラボレーションに対してオープンです。
            ぜひお気軽にご連絡ください。
          </p>
        </div>
      </div>
    </Layout>
  );
}
