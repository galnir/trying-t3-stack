// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { questionRouter } from "./questions";
import { authRouter } from "./auth";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("questions.", questionRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
