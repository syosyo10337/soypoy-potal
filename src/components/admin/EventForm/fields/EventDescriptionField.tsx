"use client";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";

interface EventDescriptionFieldProps {
  control: Control<UpdateEventData>;
  defaultValue?: string;
}

export function EventDescriptionField({
  control,
  defaultValue,
}: EventDescriptionFieldProps) {
  return (
    <Controller
      name="description"
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="description">説明</FieldLabel>
          <Input
            {...field}
            id="description"
            aria-invalid={fieldState.invalid}
            placeholder="イベントの説明を入力"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
