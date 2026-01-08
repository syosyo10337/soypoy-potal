import { useLogout } from "@refinedev/core";
import { LogOut } from "lucide-react";
import { Button } from "@/components/shadcn/button";

export function LogoutButton() {
  const { mutate: logout } = useLogout();
  return (
    <Button
      variant="ghost"
      className="w-full justify-start gap-2"
      onClick={() => logout()}
    >
      <LogOut className="h-4 w-4" />
      ログアウト
    </Button>
  );
}
