"use client";

import type { Control } from "react-hook-form";
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
import type { UpdateEventData } from "@/infrastructure/trpc/schemas/eventSchema";

interface EventTypeFieldProps {
  control: Control<UpdateEventData>;
  defaultValue?: EventType;
}

export function EventTypeField({ control, defaultValue }: EventTypeFieldProps) {
  return (
    <Controller
      name="type"
      control={control}
      defaultValue={defaultValue}
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
