import {
  IllustrationBar,
  IllustrationLighter,
  IllustrationRecord,
} from "./Illustration";
import WhatUpButton from "./WhatUpButton";
import { WhatUpLine, WhatUpLineReverse } from "./WhatUpLine";

export default function WhatUpSection() {
  return (
    <section className="w-full max-w-[80vw] mx-auto py-8 md:py-12 lg:py-16 z-30">
      <WhatUpLine />
      <div className="grid grid-cols-1 grid-flow-col grid-rows-9 gap-2 md:grid-cols-3 md:grid-rows-3 md:gap-1">
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
