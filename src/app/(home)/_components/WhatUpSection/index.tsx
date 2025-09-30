import {
  IllustrationBar,
  IllustrationLighter,
  IllustrationRecord,
} from "./Illustration";
import WhatUpButton from "./WhatUpButton";
import {
  WhatUpLine,
  WhatUpLineIntermediate,
  WhatUpLineReverse,
} from "./WhatUpLine";

export default function WhatUpSection() {
  return (
    <section
      className="
        w-full max-w-[80vw] mx-auto z-30
        py-8 md:py-12 lg:py-16"
    >
      <WhatUpLine />
      {/* スマホ用のレイアウト */}
      <div className="md:hidden">
        <div className="grid grid-cols-1 grid-flow-col grid-rows-3 gap-1">
          <WhatUpButton prefix="Shop" title="Artworks" />
          <IllustrationRecord className="row-span-2" />
        </div>
        <WhatUpLineIntermediate />
        <div className="grid grid-cols-1 grid-flow-col grid-rows-3 gap-1">
          <IllustrationBar className="row-span-2" />
          <WhatUpButton prefix="Marebito" title="Radio" />
        </div>
        <WhatUpLineIntermediate />
        <div className="grid grid-cols-1 grid-flow-col grid-rows-3 gap-1">
          <WhatUpButton prefix="Youtube" title="Channel" />
          <IllustrationLighter className="row-span-2" />
        </div>
      </div>
      {/* タブレット以上のレイアウト */}
      <div className="hidden md:grid grid-flow-col grid-cols-3 grid-rows-3 gap-1">
        <WhatUpButton prefix="Shop" title="Artworks" />
        <IllustrationRecord className="row-span-2" />
        <IllustrationBar className="row-span-2" />
        <WhatUpButton prefix="Marebito" title="Radio" />
        <WhatUpButton prefix="Youtube" title="Channel" />
        <IllustrationLighter className="row-span-2" />
      </div>

      <WhatUpLineReverse />
    </section>
  );
}
