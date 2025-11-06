import { initTRPC } from "@trpc/server";
import { DrizzleEventRepository } from "@/infrastructure/db/repositories/drizzleEventRepository";
import { EventService } from "@/services/eventService";

const eventRepository = new DrizzleEventRepository();
const eventService = new EventService(eventRepository);

export const createContext = () => {
  return { eventService };
};
export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
