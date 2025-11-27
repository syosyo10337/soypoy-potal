import { zodResolver } from "@hookform/resolvers/zod";
import type { HttpError } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { Controller } from "react-hook-form";
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
import { Input } from "@/components/shadcn/input";
import { Label } from "@/components/shadcn/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shadcn/select";
import type { EventEntity } from "@/domain/entities";
import { EventType, PublicationStatus } from "@/domain/entities";
import {
  type UpdateEventData,
  updateEventSchema,
} from "@/infrastructure/trpc/schemas/eventSchema";

interface EventEditFormProps {
  event: EventEntity;
  eventId: string;
}

/**
 * イベント編集フォーム
 *
 * データが正常に取得された場合に表示されるフォーム本体
 */
export function EventEditForm({ event, eventId }: EventEditFormProps) {
  const {
    refineCore: { onFinish, query },
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<EventEntity, HttpError, UpdateEventData>({
    resolver: zodResolver(updateEventSchema),
    refineCoreProps: {
      resource: "events",
      id: eventId,
    },
  });
  console.log(query?.data?.data);

  const onSubmit = async (data: UpdateEventData) => {
    await onFinish({
      id: eventId,
      ...data,
    });
  };

  return (
    <EditView>
      <EditViewHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle>イベント情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                タイトル <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                defaultValue={event.title}
                {...register("title", { required: "タイトルは必須です" })}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">
                日付 <span className="text-destructive">*</span>
              </Label>
              <Input
                id="date"
                type="datetime-local"
                defaultValue={event.date}
                {...register("date", { required: "日付は必須です" })}
              />
              {errors.date && (
                <p className="text-sm text-destructive">
                  {errors.date.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                種類 <span className="text-destructive">*</span>
              </Label>
              <Controller
                name="type"
                control={control}
                defaultValue={event.type}
                render={({ field }) => (
                  <Select
                    value={field.value || event.type}
                    onValueChange={(value) => {
                      const validValues = Object.values(EventType);
                      if (
                        validValues.includes(
                          value as (typeof EventType)[keyof typeof EventType],
                        )
                      ) {
                        field.onChange(value);
                      }
                    }}
                  >
                    <SelectTrigger id="type">
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
                )}
              />
              {errors.type && (
                <p className="text-sm text-destructive">
                  {errors.type.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationStatus">公開ステータス</Label>
              <Controller
                name="publicationStatus"
                control={control}
                defaultValue={event.publicationStatus}
                render={({ field }) => (
                  <Select
                    value={field.value || event.publicationStatus}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger id="publicationStatus">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={PublicationStatus.Draft}>
                        下書き
                      </SelectItem>
                      <SelectItem value={PublicationStatus.Published}>
                        公開中
                      </SelectItem>
                      <SelectItem value={PublicationStatus.Archived}>
                        アーカイブ
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">説明</Label>
              <Input
                id="description"
                defaultValue={event.description || ""}
                {...register("description")}
                placeholder="イベントの説明を入力"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">サムネイルURL</Label>
              <Input
                id="thumbnail"
                defaultValue={event.thumbnail || ""}
                {...register("thumbnail")}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">更新</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </EditView>
  );
}
