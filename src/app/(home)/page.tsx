import HeroSection from "./_components/HeroSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-soypoy-main">
      <HeroSection />


      {/* About Section */}
      <section className="section-full-height bg-[#1E88E5] text-white">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">About</h2>
          <p className="text-lg md:text-xl max-w-3xl">
            SOY-POYは、音楽愛好家やアーティストが集まる温かいコミュニティです。
            <br />
            ライブパフォーマンス、アート展示、そして何よりも素晴らしい出会いを提供します。
          </p>
        </div>
      </section>

      {/* Access Section */}
      <section className="section-full-height bg-[#4CAF50] text-white">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Access</h2>
          <div className="max-w-2xl">
            <p className="text-lg mb-4">
              〒150-0042
              <br />
              東京都渋谷区宇田川町xx-xx
            </p>
            <p className="text-lg">
              JR渋谷駅から徒歩5分
              <br />
              営業時間: 18:00 - 02:00
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
