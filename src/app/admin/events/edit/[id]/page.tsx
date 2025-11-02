"use client";

import { useForm } from "@refinedev/react-hook-form";
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
import { EventType, PublicationStatus } from "@/domain/entities";

export default function EventEditPage({ params }: { params: { id: string } }) {
  const {
    refineCore: { onFinish, queryResult },
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    refineCoreProps: {
      resource: "events",
      id: params.id,
    },
  });

  const event = queryResult?.data?.data;

  const onSubmit = async (data: any) => {
    await onFinish({
      title: data.title,
      date: data.date,
      description: data.description || undefined,
      thumbnail: data.thumbnail || undefined,
      type: data.type,
      publicationStatus: data.publicationStatus,
    });
  };

  if (queryResult?.isLoading) {
    return (
      <EditView>
        <EditViewHeader />
        <div className="text-center py-8">読み込み中...</div>
      </EditView>
    );
  }

  if (!event) {
    return (
      <EditView>
        <EditViewHeader />
        <div className="text-center py-8">イベントが見つかりません</div>
      </EditView>
    );
  }

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
              <Select
                defaultValue={event.type}
                value={watch("type") || event.type}
                onValueChange={(value) => setValue("type", value)}
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
              {errors.type && (
                <p className="text-sm text-destructive">
                  {errors.type.message as string}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="publicationStatus">公開ステータス</Label>
              <Select
                defaultValue={event.publicationStatus}
                value={watch("publicationStatus") || event.publicationStatus}
                onValueChange={(value) => setValue("publicationStatus", value)}
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
