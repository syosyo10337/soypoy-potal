"use client";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";

interface EventThumbnailFieldProps {
  control: Control<UpdateEventData>;
  defaultValue?: string;
}

// TODO: サムネイルなので、画像ファイルとURLどちらも扱えるようにする
export function EventThumbnailField({
  control,
  defaultValue,
}: EventThumbnailFieldProps) {
  return (
    <Controller
      name="thumbnail"
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="thumbnail">サムネイルURL</FieldLabel>
          <Input
            {...field}
            id="thumbnail"
            aria-invalid={fieldState.invalid}
            placeholder="https://example.com/image.jpg"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
