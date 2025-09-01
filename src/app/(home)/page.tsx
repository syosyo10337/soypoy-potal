import HeroSection from "./_components/HeroSection";

export default function Page() {
  return (
    <div className="min-h-screen bg-soypoy-main">
      <HeroSection />

      {/* Hero Section */}
      <section className="section-full-height bg-soypoy-main text-soypoy-secondary">
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">SOY-POY</h1>
          <p className="text-xl md:text-2xl mb-8 text-soypoy-secondary-80">
            Community Bar
          </p>
          <p className="text-lg max-w-2xl text-soypoy-secondary-70">
            音楽とアートが交差する特別な場所。
            <br />
            人と人が出会い、新しいつながりが生まれるコミュニティバーです。
          </p>
        </div>
      </section>

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
