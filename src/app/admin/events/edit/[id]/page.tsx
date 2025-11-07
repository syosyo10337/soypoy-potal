import { EventEditContent } from "./event-edit-content";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventEditContent eventId={id} />;
}
