import { router } from "./context";
import { closedDaysRouter } from "./routers/closedDays";
import { eventsRouter } from "./routers/events";

export const appRouter = router({
  events: eventsRouter,
  closedDays: closedDaysRouter,
});

export type AppRouter = typeof appRouter;
