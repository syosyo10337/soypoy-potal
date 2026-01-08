import { initTRPC, TRPCError } from "@trpc/server";
import { headers } from "next/headers";
import { AdminUserRole, isAdminUserRole } from "@/domain/entities";
import { auth } from "@/infrastructure/auth/server";
// NOTE: Clean Architectureでは、Services層はInfrastructure層に依存してはいけないが、tRPCのコンテキストを作成するために便宜上依存している
import { adminService, closedDayService, eventService } from "@/services";

export const createContext = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return {
    session,
    eventService,
    closedDayService,
    adminService,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

export const adminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const role = ctx.session.user.role;
  if (!isAdminUserRole(role)) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
  if (role !== AdminUserRole.Admin && role !== AdminUserRole.SuperAdmin) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});

export const superAdminProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const role = ctx.session.user.role;
  if (!isAdminUserRole(role)) {
    throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  }
  if (role !== AdminUserRole.SuperAdmin) {
    throw new TRPCError({ code: "FORBIDDEN" });
  }
  return next({
    ctx: {
      ...ctx,
      session: ctx.session,
    },
  });
});
