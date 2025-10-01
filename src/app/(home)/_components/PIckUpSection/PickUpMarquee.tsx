const text = "PICK UP EVENT!";
const repeatCount = 20;

function PickUpMarquee() {
  return (
    <div className="marquee-container marquee-gap-md font-bernard-mt text-2xl bg-soypoy-accent py-1">
      {Array.from({ length: repeatCount }, (_, _index) => (
        <div className="marquee-item" key={Math.random()}>
          {text}
        </div>
      ))}
    </div>
  );
}

function PickUpMarqueeReverse() {
  return (
    <div className="marquee-container marquee-gap-md font-bernard-mt text-2xl bg-soypoy-accent py-1">
      {Array.from({ length: repeatCount }, (_, _index) => (
        <div className="marquee-item-reverse" key={Math.random()}>
          {text}
        </div>
      ))}
    </div>
  );
}

export { PickUpMarquee, PickUpMarqueeReverse };
