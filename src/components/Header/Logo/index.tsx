import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils/cn";
import SopyoyLogoBlackImage from "./soypoyLogoBk.png";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={SopyoyLogoBlackImage}
        alt="SOYPOY"
        width={167}
        height={27}
        priority
        className={cn("object-contain", "w-24 sm:w-34 lg:w-42")}
      />
    </Link>
  );
}
