import Image from "next/image";
import Link from "next/link";

interface GridItemProps {
  thumbnail: string;
  title: string;
  link: string;
  date: string;
}

// TODO: 全体をリンクにする。
// TODO: 文字の折り返しを設定する。
export default function GridItem({
  thumbnail,
  title,
  link,
  date,
}: GridItemProps) {
  return (
    <div className={"group cursor-pointer py-6 px-4 border-soypoy-secondary"}>
      <div className="relative overflow-hidden  mb-2 aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <p className="text-xs text-soypoy-muted m-2 md:m-4">{date}</p>
      <h3 className="text-lg text-soypoy-secondary group-hover:text-soypoy-accent transition-colors break-words hyphens-auto leading-tight">
        {title}
      </h3>
      <Link
        href={link}
        className="inline-flex items-center text-muted-foreground hover:text-soypoy-main transition-colors text-sm"
      >
        Read More &gt;
      </Link>
    </div>
  );
}
