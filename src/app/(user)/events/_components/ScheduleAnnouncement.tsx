import type { ClosedDayEntity, EventEntity } from "@/domain/entities";
import { ClosedDaysAnnouncement } from "./ClosedDaysAnnouncement";
import { RegularHoursAnnouncement } from "./RegularHoursAnnouncement";

interface ScheduleAnnouncementProps {
  year: number;
  month: number;
  events: EventEntity[];
  closedDays: ClosedDayEntity[];
}

export function ScheduleAnnouncement({
  year,
  month,
  events,
  closedDays,
}: ScheduleAnnouncementProps) {
  return (
    <>
      <RegularHoursAnnouncement
        year={year}
        month={month}
        events={events}
        closedDays={closedDays}
      />
      <ClosedDaysAnnouncement
        year={year}
        month={month}
        closedDays={closedDays}
      />
    </>
  );
}
