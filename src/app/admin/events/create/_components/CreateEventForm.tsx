"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import {
  EventDateField,
  EventDescriptionField,
  EventThumbnailField,
  EventTitleField,
  EventTypeField,
} from "@/components/admin/EventFormFields";
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import type { EventEntity } from "@/domain/entities";
import {
  type CreateEventData,
  createEventSchema,
} from "@/infrastructure/trpc/schemas/eventSchema";

export function CreateEventForm() {
  const {
    refineCore: { onFinish },
    handleSubmit,
    control,
  } = useForm<EventEntity, HttpError, CreateEventData>({
    resolver: zodResolver(createEventSchema),
    refineCoreProps: {
      resource: "events",
      action: "create",
      redirect: "list",
    },
    // NOTE: to avoid uncontrolled component
    // cf. https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: CreateEventData) => {
    await onFinish(data);
  };

  return (
    <CreateView>
      <CreateViewHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>イベント情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <EventTitleField control={control} />
                <EventDateField control={control} />
                <EventTypeField control={control} />
                <EventDescriptionField control={control} />
              </div>
              <div>
                <EventThumbnailField control={control} />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">作成</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </CreateView>
  );
}
