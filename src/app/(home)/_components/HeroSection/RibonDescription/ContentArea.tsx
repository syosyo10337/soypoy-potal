import { Separator } from "@/components/shadcn/separator";
import { cn } from "@/utils/cn";
import { MoonIcon, SunIcon } from "./assets";

interface ContentAreaProps {
  className?: string;
}

export default function ContentArea({ className }: ContentAreaProps) {
  return (
    <div className={cn("p-4", className)}>
      <HeroSecHeader />
      <div
        className={cn(
          "flex",
          "flex-col lg:flex-row",
          "gap-3 md:gap-0 lg:gap-4",
        )}
      >
        <HeroSecMainContent />
        <HeroSecSeparator />
        <SoypoySlogan />
      </div>
    </div>
  );
}

function HeroSecHeader() {
  return (
    <div className={cn("text-center", "pb-2 pt-2 md:pb-0")}>
      <h2 className="text-xl font-bold font-anymale flex items-center justify-center">
        <SunIcon className="w-10 h-10" />
        <span className="text-2xl">About SOY-POY</span>
        <MoonIcon className="w-10 h-10" />
      </h2>
    </div>
  );
}

function HeroSecMainContent() {
  return (
    <div className="flex-1 lg:w-7/10">
      <p
        className={cn("leading-relaxed", "text-sm/6 md:text-lg/8 font-medium")}
      >
        SOY-POYは「好きに生きて、一緒に生きる」をコンセプトに
        オープンしたバーとステージのある週末限定のパブリックハウス
        （PUB）です。下北沢に拠点を構えるSOY-POYは、ジャンル
        を問わず、さまざまな表現や創作をする人たちが集い、互いに
        交流しながら、誰もが自由に表現や創作活動を楽しめるコミュ
        ニティづくりをおこなっています。
      </p>
    </div>
  );
}

function HeroSecSeparator() {
  return (
    <>
      <div className="hidden md:block lg:pb- lg:pt-2">
        <Separator
          orientation="vertical"
          className="h-full !w-[2px] bg-soypoy-secondary"
        />
      </div>
      <div className="block md:hidden">
        <Separator
          orientation="horizontal"
          className="!h-[1px] bg-soypoy-secondary"
        />
      </div>
    </>
  );
}

function SoypoySlogan() {
  const slogans = [
    {
      title: "SPACE",
      description: "この空間への敬意",
    },
    {
      title: "OTHERS",
      description: "ここにいる他者への敬意",
    },
    {
      title: "YOURSELF",
      description: "自分自身への敬意",
    },
  ];

  return (
    <div className="lg:w-3/10 space-y-4">
      <div className="space-y-3">
        <div
          className={cn("flex flex-col gap-2", "items-center lg:items-start")}
        >
          {slogans.map((slogan) => (
            <div
              className="flex items-start text-center lg:text-left"
              key={slogan.title}
            >
              <div className="pb-1">
                <h3
                  className={cn(
                    "font-bold font-anymale",
                    "text-xl md:text-2xl",
                  )}
                >
                  <span
                    className={cn(
                      "text-2xl md:text-3xl ",
                      "font-black text-soypoy-accent",
                    )}
                  >
                    {slogan.title[0]}
                  </span>
                  {slogan.title.slice(1)}
                </h3>
                <p
                  className={cn(
                    "text-base md:text-lg",
                    "font-zen-old-mincho leading-none",
                  )}
                >
                  {slogan.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
