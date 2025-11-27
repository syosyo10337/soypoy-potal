"use client";

import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import { EventType } from "@/domain/entities";

interface EventTypeFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: EventType;
}

export function EventTypeField<T extends FieldValues>({
  control,
  defaultValue,
}: EventTypeFieldProps<T>) {
  return (
    <Controller
      name={"type" as Path<T>}
      control={control}
      defaultValue={defaultValue as PathValue<T, Path<T>>}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor="type">
            イベントの種類 <span className="text-destructive">*</span>
          </FieldLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="type" aria-invalid={fieldState.invalid}>
              <SelectValue placeholder="種類を選択" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(EventType).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {key}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
