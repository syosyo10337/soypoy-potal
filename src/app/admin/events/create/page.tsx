"use client";

import { useForm } from "@refinedev/react-hook-form";
import { nanoid } from "nanoid";
import {
  CreateView,
  CreateViewHeader,
} from "@/components/refine-ui/views/create-view";
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

export default function EventCreatePage() {
  const {
    refineCore: { onFinish },
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    refineCoreProps: {
      resource: "events",
    },
  });

  const onSubmit = async (data: any) => {
    await onFinish({
      id: nanoid(),
      title: data.title,
      date: data.date,
      description: data.description || undefined,
      thumbnail: data.thumbnail || undefined,
      type: data.type,
      publicationStatus: data.publicationStatus || PublicationStatus.Draft,
    });
  };

  return (
    <CreateView>
      <CreateViewHeader />
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
                value={watch("type") || ""}
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
                value={watch("publicationStatus") || PublicationStatus.Draft}
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
                {...register("description")}
                placeholder="イベントの説明を入力"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">サムネイルURL</Label>
              <Input
                id="thumbnail"
                {...register("thumbnail")}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button type="submit">作成</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </CreateView>
  );
}
