import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import SopyoyLogoBlackImage from "./soypoyLogoBk.png";

export default function Logo() {
  return (
    <Link
      href="/"
      className={cn(
        "flex items-center",
        "backdrop-blur-progressive bg-white/20",
        "rounded-lg px-2 py-1",
      )}
    >
      <Image
        src={SopyoyLogoBlackImage}
        alt="SOYPOY"
        width={167}
        height={27}
        priority
        className={cn("object-contain", "w-24")}
      />
    </Link>
  );
}
