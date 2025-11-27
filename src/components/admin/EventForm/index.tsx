"use client";

import type { Control } from "react-hook-form";
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";
import {
  EventDateField,
  EventDescriptionField,
  EventPublicationStatusField,
  EventThumbnailField,
  EventTitleField,
  EventTypeField,
} from "./fields";

interface EventFormFieldsProps {
  control: Control<UpdateEventData>;
  defaultValues?: Partial<UpdateEventData>;
}

/**
 * イベントフォームの全フィールドをまとめたコンポーネント
 * Create/Edit 両方で使用可能
 */
export function EventFormFields({
  control,
  defaultValues,
}: EventFormFieldsProps) {
  return (
    <div className="space-y-4">
      <EventTitleField control={control} defaultValue={defaultValues?.title} />
      <EventDateField control={control} defaultValue={defaultValues?.date} />
      <EventTypeField control={control} defaultValue={defaultValues?.type} />
      <EventPublicationStatusField
        control={control}
        defaultValue={defaultValues?.publicationStatus}
      />
      <EventDescriptionField
        control={control}
        defaultValue={defaultValues?.description}
      />
      <EventThumbnailField
        control={control}
        defaultValue={defaultValues?.thumbnail}
      />
    </div>
  );
}
