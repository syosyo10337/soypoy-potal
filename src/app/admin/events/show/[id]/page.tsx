import { EventShowContent } from "./event-show-content";

export default async function EventShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventShowContent eventId={id} />;
}
