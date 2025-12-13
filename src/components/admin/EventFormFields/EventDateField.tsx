"use client";

import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import type { Control, FieldValues, Path, PathValue } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Button } from "@/components/shadcn/button";
import { Calendar } from "@/components/shadcn/Calendar";
import { Field, FieldError, FieldLabel } from "@/components/shadcn/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/shadcn/popover";
import { formatDateJP } from "@/utils/date";

interface EventDateFieldProps<T extends FieldValues> {
  control: Control<T>;
  defaultValue?: string;
}

/**
 * イベント日付入力フィールド
 */
export function EventDateField<T extends FieldValues>({
  control,
  defaultValue,
}: EventDateFieldProps<T>) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className="w-full justify-start text-left font-normal hover:text-foreground"
                aria-invalid={fieldState.invalid}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {field.value ? (
                  formatDateJP(field.value)
                ) : (
                  <span className="text-muted-foreground">日付を選択</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setIsOpen(false);
                }}
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
