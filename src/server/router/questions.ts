import { z } from "zod";
import { prisma } from "../db/client";
import { createQuestionValidator } from "../../shared/create-question-validator";
import { createRouter } from "./context";

export const questionRouter = createRouter()
  .query("get-all-my-questions", {
    async resolve({ ctx }) {
      if (!ctx.token || !ctx.session || !ctx.session.userId) return [];
      return await prisma.pollQuestion.findMany({
        where: {
          userId: {
            equals: ctx.session.userId as string,
          },
        },
      });
    },
  })
  .query("get-all-questions", {
    async resolve() {
      return await prisma.pollQuestion.findMany({
        select: {
          question: true,
          id: true,
          User: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    },
  })
  .query("get-by-id", {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input, ctx }) {
      const question = await prisma.pollQuestion.findFirst({
        where: {
          id: input.id,
        },
      });

      return { question, isOwner: question?.userId === ctx.session?.userId };
    },
  })
  .mutation("vote-on-question", {
    input: z.object({
      questionId: z.string(),
      option: z.number().min(0).max(10),
    }),
    async resolve({ input, ctx }) {
      if (!ctx.token || !ctx.session) throw new Error("Unauthroized");
      await prisma.vote.create({
        data: {
          questionId: input.questionId,
          choice: input.option,
          userId: ctx.session.userId as string,
        },
      });

      return await prisma.vote.groupBy({
        where: { questionId: input.questionId },
        by: ["choice"],
        _count: true,
      });
    },
  })
  .mutation("create", {
    input: createQuestionValidator,
    async resolve({ input, ctx }) {
      if (!ctx.token || !ctx.session || !ctx.session.userId)
        throw new Error("Unauthorized");

      return await prisma.pollQuestion.create({
        data: {
          question: input.question,
          options: input.options,
          userId: ctx.session?.userId as string,
        },
      });
    },
  });
