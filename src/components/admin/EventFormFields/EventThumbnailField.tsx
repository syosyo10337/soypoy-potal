"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import {
  type ImageChangeHandler,
  ImageUploader,
  zodImageAdapter,
} from "@/components/ImageField";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";

interface EventThumbnailFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: string;
}

export function EventThumbnailField<T extends FieldValues>({
  control,
  defaultValue,
}: EventThumbnailFieldProps<T>) {
  return (
    <Controller
      name={"thumbnail" as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => {
        // アダプター層を使用した変換処理
        const imageValue = zodImageAdapter.fromSchema(field.value);

        const handleChange: ImageChangeHandler = (value) => {
          const convertedValue = zodImageAdapter.toSchema(value);
          field.onChange(convertedValue);
        };

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="thumbnail">サムネイルURL</FieldLabel>
            <ImageUploader value={imageValue} onChange={handleChange} />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        );
      }}
    />
  );
}
