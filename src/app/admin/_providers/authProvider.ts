import type { AuthProvider } from "@refinedev/core";
import { authClient } from "@/infrastructure/auth/client";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      return {
        success: false,
        error: normalizeLoginError(error),
      };
    }
    return { success: true, redirectTo: "/admin" };
  },
  logout: async () => {
    await authClient.signOut();
    return { success: true, redirectTo: "/admin/login" };
  },
  check: async () => {
    const { data: session } = await authClient.getSession();
    if (session) {
      return { authenticated: true };
    }
    return { authenticated: false, redirectTo: "/admin/login" };
  },
  getIdentity: async () => {
    const { data: session } = await authClient.getSession();
    if (session?.user) {
      return {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        role: session.user.role,
      };
    }
    return null;
  },
  onError: async (error) => {
    if (error.status === 401 || error.status === 403) {
      return { logout: true, redirectTo: "/admin/login" };
    }
    return { error };
  },
};

const normalizeLoginError = (error: {
  message?: string;
  status?: number;
}): { message: string; statusCode: number } => {
  const message = error.message?.toLowerCase() ?? "";
  const status = error.status ?? 500;

  if (
    message.includes("user not found") ||
    message.includes("invalid") ||
    message.includes("incorrect") ||
    message.includes("credentials") ||
    status === 401
  ) {
    return {
      message: "メールアドレスまたはパスワードが正しくありません",
      statusCode: 401,
    };
  }

  return {
    message: "不明なエラーが発生しました。しばらく経ってから再度お試しください",
    statusCode: status,
  };
};
