import { cn } from "@/utils/cn";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionTitle({
  children,
  className,
}: SectionTitleProps) {
  return (
    <h1
      className={cn(
        "font-anymale",
        "text-5xl md:text-7xl",
        "tracking-tight",
        "text-black text-center",
        className,
      )}
    >
      {children}
    </h1>
  );
}
