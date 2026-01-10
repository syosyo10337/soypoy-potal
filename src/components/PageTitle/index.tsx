import { cn } from "@/utils/cn";

interface PageTitleProps {
  title: string;
  subtitle?: string;
}

export function PageTitle({ title, subtitle }: PageTitleProps) {
  const firstChar = title[0];
  const restChars = title.slice(1);

  return (
    <div className="flex flex-col items-center px-10 py-8">
      <h1
        className={cn(
          "tracking-tight font-bold text-soypoy-secondary font-anymale",
          "text-5xl md:text-6xl",
          "leading-[40px]",
        )}
      >
        <span className="text-6xl md:text-7xl">{firstChar}</span>
        {restChars}
      </h1>
      {subtitle && (
        <p className="text-lg md:text-xl text-soypoy-accent font-bernard-mt leading-[10px]">
          {subtitle}
        </p>
      )}
    </div>
  );
}
