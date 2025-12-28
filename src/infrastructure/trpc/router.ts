import { router } from "./context";
import { adminsRouter } from "./routers/admins";
import { authRouter } from "./routers/auth";
import { closedDaysRouter } from "./routers/closedDays";
import { eventsRouter } from "./routers/events";

export const appRouter = router({
  events: eventsRouter,
  closedDays: closedDaysRouter,
  admins: adminsRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
