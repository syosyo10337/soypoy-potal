export default function OpeningHours({ className }: { className: string }) {
  return (
    <div className={`text-left ${className}`}>
      <h2 className="text-3xl md:text-[32px] font-bold">PUB「SOY-POY」</h2>
      <div className="md:pr-22">
        <OpeningHoursDetail title="Every FRI." open="19:30" close="23:30" />
        <OpeningHoursDetail
          title="Every SAT. SUN."
          open="19:00"
          close="23:30"
        />
      </div>
    </div>
  );
}

function OpeningHoursDetail({
  title,
  open,
  close,
}: {
  title: string;
  open: string;
  close: string;
}) {
  return (
    <div className="flex gap-2 font-display text-2xl justify-between">
      <p>{title}</p>
      <div className="grid grid-cols-[auto_auto] gap-x-2">
        <p>OPEN</p>
        <p>{open}</p>
        <p>CLOSE</p>
        <p>{close}</p>
      </div>
    </div>
  );
}
