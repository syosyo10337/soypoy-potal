import Image from "next/image";

export default function Home() {
  const techStacks = [
    { name: "Next.js", description: "React フレームワーク" },
    { name: "TypeScript", description: "型安全な JavaScript" },
    { name: "Tailwind CSS", description: "ユーティリティファーストの CSS フレームワーク" },
    { name: "Jotai", description: "プリミティブでコンポーザブルな状態管理ライブラリ" },
    { name: "React Hook Form", description: "高性能でフレキシブルなフォームライブラリ" },
    { name: "Zod", description: "TypeScript ファーストのスキーマ検証" },
    { name: "Prisma", description: "次世代の ORM" },
    { name: "Supabase", description: "オープンソースの Firebase 代替" },
    { name: "Storyblok", description: "ヘッドレス CMS" },
    { name: "Docker", description: "コンテナ化プラットフォーム" },
    { name: "Biome", description: "高速な JavaScript / TypeScript フォーマッター" },
    { name: "ESLint", description: "JavaScript / TypeScript リンター" },
  ];

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <header className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">SoyPoy Portal</h1>
          <p className="text-lg text-gray-600 mb-8">
            モダンなウェブ開発技術スタックを使用したポータルサイト
          </p>
        </header>

        <main>
          <section className="bg-white p-8 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">技術スタック</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStacks.map((tech) => (
                <div
                  key={tech.name}
                  className="p-4 border border-gray-200 rounded-md hover:border-blue-300 transition-colors"
                >
                  <h3 className="font-medium text-lg text-gray-900">{tech.name}</h3>
                  <p className="text-gray-600 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </section>
        </main>

        <footer className="py-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} SoyPoy Portal</p>
        </footer>
      </div>
    </div>
  );
}
