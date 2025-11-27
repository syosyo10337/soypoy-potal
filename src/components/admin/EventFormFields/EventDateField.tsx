"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";

interface EventDateFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: string;
}

export function EventDateField<T extends FieldValues>({
  control,
  defaultValue,
}: EventDateFieldProps<T>) {
  return (
    <Controller
      name={"date" as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
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
