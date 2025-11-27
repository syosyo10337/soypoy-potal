"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { useParams } from "next/navigation";
import { EventFormFields } from "@/components/admin/EventForm";
import {
  EditView,
  EditViewHeader,
} from "@/components/refine-ui/views/edit-view";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import type { EventEntity } from "@/domain/entities";
import {
  type UpdateEventData,
  updateEventSchema,
} from "@/infrastructure/trpc/schemas/eventSchema";
import { EventError } from "../../_components/EventError";
import { EventLoading } from "../../_components/EventLoading";
import { EventNotFound } from "../../_components/EventNotFound";

/**
 * イベント編集フォーム
 *
 * useFormで自動的にデータを取得し、フォームを管理
 * URLから自動的にIDを取得するため、propsは不要
 */
export function EventEditForm() {
  const params = useParams();
  const eventId = params.id as string;

  const {
    refineCore: { onFinish, query },
    handleSubmit,
    control,
  } = useForm<EventEntity, HttpError, UpdateEventData>({
    resolver: zodResolver(updateEventSchema),
    refineCoreProps: {
      resource: "events",
      id: eventId,
      action: "edit",
      redirect: "show",
    },
  });

  const { data, isLoading, isError, refetch } = query ?? {};
  const defaultValues = data?.data;

  if (isLoading) return <EventLoading viewType="edit" />;
  if (isError) return <EventError viewType="edit" onRetry={refetch} />;
  if (!defaultValues) return <EventNotFound viewType="edit" />;

  const onSubmit = async (formData: UpdateEventData) => {
    await onFinish(formData);
  };

  return (
    <EditView>
      <EditViewHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>イベント情報</CardTitle>
          </CardHeader>
          <CardContent>
            <EventFormFields control={control} defaultValues={defaultValues} />
            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit">更新</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </EditView>
  );
}
