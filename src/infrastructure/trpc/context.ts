import { initTRPC } from "@trpc/server";
import { DrizzleClosedDayRepository } from "@/infrastructure/db/repositories/drizzleClosedDayRepository";
import { DrizzleEventRepository } from "@/infrastructure/db/repositories/drizzleEventRepository";
import { ClosedDayService } from "@/services/closedDayService";
import { EventService } from "@/services/eventService";

const eventRepository = new DrizzleEventRepository();
const eventService = new EventService(eventRepository);

const closedDayRepository = new DrizzleClosedDayRepository();
const closedDayService = new ClosedDayService(closedDayRepository);

export const createContext = () => {
  return { eventService, closedDayService };
};
export type Context = ReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
