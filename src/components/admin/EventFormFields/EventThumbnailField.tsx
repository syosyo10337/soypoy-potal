"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";

interface EventThumbnailFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: string;
}

// TODO: サムネイルなので、画像ファイルとURLどちらも扱えるようにする
export function EventThumbnailField<T extends FieldValues>({
  control,
  defaultValue,
}: EventThumbnailFieldProps<T>) {
  return (
    <Controller
      name={"thumbnail" as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
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
