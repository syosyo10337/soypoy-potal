import Image from "next/image";
import ArchImage from "./soypoyArch.png";

export default function ArchDecoration({ className }: { className: string }) {
  return (
    <div className={className}>
      {/* aspect-ratioを固定してレスポンシブ時の位置ずれを防ぐ */}
      <div className="relative w-full aspect-[1420/426]">
        <Image
          src={ArchImage}
          alt="Arch Decoration"
          width={1420}
          height={426}
          className="w-full h-auto"
        />
      </div>
    </div>
  );
}
