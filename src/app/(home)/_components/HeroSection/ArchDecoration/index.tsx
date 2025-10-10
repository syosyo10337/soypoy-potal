import Image from "next/image";
import FudaOverLay from "./FudaOverLay";
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
        {/* FudaOverLayを同じaspect-ratio内に配置 */}
        <FudaOverLay className="hidden md:block absolute inset-0 pointer-events-none" />
      </div>
    </div>
  );
}
