import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
        ページが見つかりません
      </h2>
      <p className="text-gray-300 mb-8 max-w-md">
        お探しのページは存在しないか、移動した可能性があります。
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors"
      >
        ホームに戻る
      </Link>
    </div>
  );
}
