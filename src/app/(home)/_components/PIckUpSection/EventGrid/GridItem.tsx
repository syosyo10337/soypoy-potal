import Image from "next/image";
import Link from "next/link";

interface GridItemProps {
  thumbnail: string;
  title: string;
  link: string;
  className?: string;
}

export default function GridItem({
  thumbnail,
  title,
  link,
  className,
}: GridItemProps) {
  return (
    <div className={`group cursor-pointer py-6 px-4 ${className}`}>
      <div className="relative overflow-hidden  mb-2 aspect-square">
        <Image
          src={thumbnail}
          alt={title}
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <h3 className="text-lg font-semibold mb-2 text-white group-hover:text-soypoy-secondary transition-colors">
        {title}
      </h3>
      <Link
        href={link}
        className="inline-flex items-center text-soypoy-secondary hover:text-white transition-colors text-sm font-medium"
      >
        Read More &gt;
      </Link>
    </div>
  );
}
