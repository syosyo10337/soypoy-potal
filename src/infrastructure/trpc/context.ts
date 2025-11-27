import { initTRPC } from "@trpc/server";
import { closedDayService, eventService } from "@/services";

export const createContext = () => {
  return { eventService, closedDayService };
};
export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
