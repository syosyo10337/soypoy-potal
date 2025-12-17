import Image from "next/image";
import { cn } from "@/utils/cn";

export interface MemberPillProps {
  name: string;
  role: string;
  profileImage?: string;
  color: string;
}

export default function MemberPill({
  name,
  role,
  profileImage,
  color,
}: MemberPillProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center",
        "w-[156px] h-[410px]",
        "rounded-[78px]",
        "pt-9 pb-10 px-6",
        "gap-[68px]",
        "shrink-0",
      )}
      style={{ backgroundColor: color }}
    >
      {/* Role */}
      <div
        className={cn(
          "font-display font-normal",
          "text-[13px] leading-[14px]",
          "text-white text-center",
          "tracking-wide",
        )}
      >
        {role.split("\n").map((line, index) => (
          <p key={line} className={index > 0 ? "" : ""}>
            {line}
          </p>
        ))}
      </div>

      {/* Profile Image */}
      <div
        className={cn(
          "relative",
          "w-[110px] h-[110px]",
          "rounded-full",
          "overflow-hidden",
          "shrink-0",
          "bg-white/20",
        )}
      >
        {profileImage ? (
          <Image
            src={profileImage}
            alt={`${name}のプロフィール画像`}
            fill
            sizes="110px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-white/30" />
        )}
      </div>

      {/* Name */}
      <div
        className={cn(
          "font-display font-normal",
          "text-[20px] leading-[21px]",
          "text-white text-center",
        )}
      >
        {name.split("\n").map((line, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <TODO: 後で直す>
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
}
