import { DateTile } from "./DateTile";

interface ScheduleAnnouncementProps {
  title: string;
  dates: string[];
  description?: string;
}

export function BaseScheduleAnnouncement({
  title,
  dates,
  description,
}: ScheduleAnnouncementProps) {
  return (
    <div className="mt-8 md:mt-12 text-soypoy-secondary">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center">
        {title}
      </h2>
      {description && (
        <p className="text-sm md:text-base mb-4">{description}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {dates.map((date) => (
          <DateTile key={date} date={date} />
        ))}
      </div>
    </div>
  );
}
