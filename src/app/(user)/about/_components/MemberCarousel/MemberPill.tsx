import type { StaticImageData } from "next/image";
import Image from "next/image";
import { cn } from "@/utils/cn";

export interface MemberPillProps {
  name: string;
  role: string;
  profileImage?: string | StaticImageData;
  color: string;
}

export default function MemberPill({
  name,
  role,
  profileImage,
  color,
}: MemberPillProps) {
  const roles = role.split(/\s*\/\s*/);
  const names = name.split(/(\s+)/);

  return (
    <div
      className={cn(
        "grid grid-rows-[auto_1fr_auto]",
        "w-39 h-103",
        "rounded-[78px]",
        "pt-9 pb-10 px-6",
        "shrink-0",
      )}
      style={{ backgroundColor: color }}
    >
      <div
        className={cn(
          "font-display font-normal",
          "text-sm",
          "leading-4",
          "text-white text-center",
          "tracking-wide",
        )}
      >
        {roles.map((role) => (
          <p key={role}>{role}</p>
        ))}
      </div>

      <div className="flex items-center justify-center">
        <div
          className={cn(
            "relative",
            "w-28 h-28",
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
              draggable={false}
            />
          ) : (
            <div className="w-full h-full bg-white/30" />
          )}
        </div>
      </div>

      <div
        className={cn(
          "font-display font-normal",
          "text-xl leading-5",
          "text-white text-center",
        )}
      >
        {names.map((name) => (
          <p key={name}>{name}</p>
        ))}
      </div>
    </div>
  );
}
