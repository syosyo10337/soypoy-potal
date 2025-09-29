import Image from "next/image";

function WhatUpLine() {
  return (
    <div className="relative w-full h-5 mb-1">
      <Image
        src="/images/whatup/what_up_line.png"
        alt="Cover line"
        fill
        className="object-fit"
      />
    </div>
  );
}

function WhatUpLineReverse() {
  return (
    <div className="relative w-full h-5 mb-1">
      <Image
        src="/images/whatup/what_up_line.png"
        alt="Cover line"
        fill
        className="object-fit rotate-180"
      />
    </div>
  );
}

export { WhatUpLine, WhatUpLineReverse };
