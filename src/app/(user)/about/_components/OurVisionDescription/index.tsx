import { cn } from "@/utils/cn";

export default function OurVisionDescription() {
  return (
    <section className="flex flex-col items-center text-center px-6 md:px-12 py-12 md:py-20">
      {/* Page Title */}
      <h1
        className={cn(
          "font-anymale",
          "text-5xl md:text-7xl",
          "tracking-tight",
          "text-black",
        )}
      >
        About
      </h1>

      {/* Catchphrase */}
      <h2
        className={cn(
          "font-display font-semibold",
          "text-2xl md:text-5xl",
          "leading-tight md:leading-[52px]",
          "tracking-tight",
          "text-black",
          "mt-8 md:mt-16",
        )}
      >
        <span className="md:hidden">
          好きに生きて、
          <br />
          一緒に生きる
        </span>
        <span className="hidden md:inline">好きに生きて、一緒に生きる</span>
      </h2>

      {/* Description */}
      <div
        className={cn(
          "font-display font-semibold",
          "text-base md:text-[26px]",
          "leading-relaxed md:leading-[51px]",
          "text-black",
          "mt-8 md:mt-12",
          "max-w-[273px] md:max-w-[878px]",
        )}
      >
        <p>SOY-POY（ソイポイ）は、</p>
        <p>「好きに生きて、一緒に生きる」をコンセプトに生まれた、</p>
        <p>バーとステージのある週末限定のパブリックハウス（PUB）です。</p>
        <p>拠点は下北沢。</p>
        <p>ジャンルを問わず、さまざまな表現や創作を志す人たちが集い、</p>
        <p>交流しながら、誰もが自由に表現や創作活動を楽しめる</p>
        <p>オープンなコミュニティづくりを行っています。</p>
      </div>
    </section>
  );
}
