import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import { AlertCircle } from "lucide-react";

type AdminErrorProps = {
  onRetry: () => void;
};

export function AdminError({ onRetry }: AdminErrorProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-destructive" />
          <CardTitle>エラーが発生しました</CardTitle>
        </div>
        <CardDescription>
          管理者情報の取得中にエラーが発生しました
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onRetry}>再試行</Button>
      </CardContent>
    </Card>
  );
}





