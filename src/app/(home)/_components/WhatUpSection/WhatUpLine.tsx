const LINE_COUNT = 100;
const WORD = "What’s up";

function WhatUpLineBase() {
  return (
    <div className="flex gap-[3px]">
      {[...Array(LINE_COUNT)].map((_, i) => (
        <div
          key={Math.random()}
          className={`w-[10px] h-[18px] md:w-4 md:h-7 ${i % 2 === 0 ? "bg-soypoy-accent" : "bg-soypoy-secondary"}`}
        />
      ))}
    </div>
  );
}

function WhatUpLine() {
  return (
    <div className="flex items-center mb-1/2 overflow-hidden md:gap-1">
      <h2 className="text-xl md:text-3xl font-bernard-mt text-nowrap mr-1">
        {WORD}
      </h2>
      <WhatUpLineBase />
    </div>
  );
}

function WhatUpLineReverse() {
  return (
    <div className="flex flex-row-reverse items-center mb-1/2 overflow-hidden md:gap-1">
      <h2 className="text-xl md:text-3xl font-bernard-mt text-nowrap rotate-180 ml-1">
        {WORD}
      </h2>
      <WhatUpLineBase />
    </div>
  );
}

function WhatUpLineIntermediate() {
  return (
    <div className="flex items-center my-1 overflow-hidden md:gap-1">
      <WhatUpLineBase />
    </div>
  );
}

export { WhatUpLine, WhatUpLineReverse, WhatUpLineIntermediate };
