"use client";

import type { Control } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";

interface EventDateFieldProps {
  control: Control<UpdateEventData>;
  defaultValue?: string;
}

export function EventDateField({ control, defaultValue }: EventDateFieldProps) {
  return (
    <Controller
      name="date"
      control={control}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="date">
            日付 <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            {...field}
            id="date"
            type="datetime-local"
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
