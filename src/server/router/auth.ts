import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const authRouter = createRouter()
  .query("get-session", {
    resolve({ ctx }) {
      return ctx.session;
    },
  })
  .middleware(async ({ ctx, next }) => {
    if (!ctx.session) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    return next();
  });
