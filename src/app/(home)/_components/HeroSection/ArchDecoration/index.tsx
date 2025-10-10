import Image from "next/image";
import ArchImage from "./soypoyArch.png";

export default function ArchDecoration({ className }: { className: string }) {
  return (
    <div className={className}>
      <Image
        src={ArchImage}
        alt="Arch Decoration"
        width={1420}
        height={426}
        className="w-full h-auto"
      />
    </div>
  );
}
