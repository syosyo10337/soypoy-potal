"use client";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";

interface EventTitleFieldProps {
  control: Control<UpdateEventData>;
  defaultValue?: string;
}

export function EventTitleField({
  control,
  defaultValue,
}: EventTitleFieldProps) {
  return (
    <Controller
      name="title"
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="title">
            タイトル <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            {...field}
            id="title"
            aria-invalid={fieldState.invalid}
            placeholder="イベントタイトルを入力"
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
