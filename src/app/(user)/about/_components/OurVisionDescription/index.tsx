import { cn } from "@/utils/cn";
import SectionTitle from "../SectionTitle";
// // TODO
// - sloganの並びを考える
// - catchphraseの並びを考える
export default function OurVisionDescription() {
  const slogan = `SOY-POY（ソイポイ）は、
「好きに生きて、一緒に生きる」をコンセプトに生まれた、
バーとステージのある週末限定のパブリックハウス（PUB）です。
拠点は下北沢。
ジャンルを問わず、さまざまな表現や創作を志す人たちが集い、
交流しながら、誰もが自由に表現や創作活動を楽しめる
オープンなコミュニティづくりを行っています。`;

  return (
    <section className="flex flex-col items-center text-center px-6 md:px-12 py-12 md:py-20">
      <SectionTitle>About</SectionTitle>
      <h2
        className={cn(
          "font-display font-semibold",
          "text-4xl md:text-5xl",
          "leading-tight md:leading-[52px]",
          "tracking-tight",
          "text-black",
          "mt-8 md:mt-16",
        )}
      >
        <p className="md:hidden flex flex-col items-start">
          <span>好きに生きて、</span>
          <span>一緒に生きる</span>
        </p>
        <p className="hidden md:inline">好きに生きて、一緒に生きる</p>
      </h2>

      <p
        className={cn(
          "font-display font-semibold",
          "text-base md:text-[26px]",
          "leading-relaxed md:leading-[51px]",
          "text-black",
          "mt-8 md:mt-12",
          "whitespace-pre-line",
        )}
      >
        {slogan}
      </p>
    </section>
  );
}
