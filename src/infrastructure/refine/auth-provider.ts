import type { AuthProvider } from "@refinedev/core";
import { authClient } from "@/infrastructure/auth/client";

export const authProvider: AuthProvider = {
  login: async ({ email, password }) => {
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      return {
        success: false,
        error: {
          message: error.message ?? "",
          statusCode: error.status ?? 500,
        },
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
        avatar: session.user.image,
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
