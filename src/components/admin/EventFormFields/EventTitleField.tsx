"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";

interface EventTitleFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: string;
}

export function EventTitleField<T extends FieldValues>({
  control,
  defaultValue,
}: EventTitleFieldProps<T>) {
  return (
    <Controller
      name={"title" as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
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
