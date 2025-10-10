import { Separator } from "@/components/shadcn/separator";
import { MoonIcon, SunIcon } from "./assets";

export default function ContentArea() {
  return (
    <div
      className="bg-soypoy-main/95 backdrop-blur-sm rounded-3xl
                       p-6 "
    >
      <HeroSecHeader />
      <div className="flex flex-col md:flex-row gap-4">
        <HeroSecMainContent />
        <HeroSecSeparator />
        <SoypoySlogan />
      </div>
    </div>
  );
}

function HeroSecHeader() {
  return (
    <div className="text-center mb-2">
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
    <div className="flex-1 md:w-7/10">
      <p className="text-sm md:text-base leading-relaxed">
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
      <div className="hidden md:block">
        <Separator
          orientation="vertical"
          className="h-full border-soypoy-secondary border-1"
        />
      </div>
      <div className="block md:hidden">
        <Separator
          orientation="horizontal"
          className="border-soypoy-secondary border-1"
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
    <div className="md:w-3/10 space-y-4">
      <div className="space-y-3">
        <div className="flex items-center md:items-start flex-col gap-2">
          {slogans.map((slogan) => (
            <div
              className="flex items-start text-center md:text-left"
              key={slogan.title}
            >
              <div>
                <h3 className="font-bold font-anymale">
                  <span className="text-xl font-black text-soypoy-accent">
                    {slogan.title[0]}
                  </span>
                  {slogan.title.slice(1)}
                </h3>
                <p className="text-sm font-bernard-mt ">{slogan.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
