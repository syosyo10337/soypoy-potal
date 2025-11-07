import { router } from "./context";
import { eventsRouter } from "./routers/events";

export const appRouter = router({
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
