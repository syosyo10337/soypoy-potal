import { cn } from "@/utils/cn";

type ContentType = "artworks" | "radio" | "channel";

const CONTENT_CONFIG = {
  artworks: { subtitle: "Artwork" },
  radio: { subtitle: "Radio" },
  channel: { subtitle: "Channel" },
} as const;

interface WhatsUpPageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function WhatsUpPage({ searchParams }: WhatsUpPageProps) {
  const resolvedSearchParams = await searchParams;
  const contentType = getContentType(resolvedSearchParams.type);
  const config = CONTENT_CONFIG[contentType];

  const title = "What’s up";
  const firstChar = title[0];
  const restChars = title.slice(1);

  return (
    <div
      className={cn(
        "min-h-screen bg-soypoy-main",
        "flex flex-col items-center justify-center",
        "px-4 py-16 md:py-24",
      )}
    >
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
        <p className="text-lg md:text-xl text-soypoy-accent font-bernard-mt leading-[10px]">
          {config.subtitle}
        </p>
      </div>
      <p
        className={cn(
          "font-anymale",
          "text-5xl md:text-[66px]",
          "leading-tight md:leading-[66px]",
          "tracking-tight md:tracking-[-1.32px]",
          "text-black",
          "pt-8 md:pt-16",
        )}
      >
        Coming soon...
      </p>
    </div>
  );
}

function getContentType(typeParam: string | undefined): ContentType {
  if (!typeParam) return "artworks";

  const validTypes: ContentType[] = ["artworks", "radio", "channel"];
  if (validTypes.includes(typeParam as ContentType)) {
    return typeParam as ContentType;
  }

  return "artworks";
}
