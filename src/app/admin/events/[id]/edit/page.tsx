import { EventEditContent } from "./EventEditContent";

export default async function EventEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <EventEditContent eventId={id} />;
}
