export default function OpeningHours({
  title,
  open,
  close,
}: {
  title: string;
  open: string;
  close: string;
}) {
  return (
    <div className="flex items-start gap-4 font-display text-2xl">
      <p className="text-2xl">{title}</p>
      <div className="">
        <p>OPEN {open}</p>
        <p>CLOSE {close}</p>
      </div>
    </div>
  );
}
