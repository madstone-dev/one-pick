import client from "../../client";
import { Context, IcursorPaginateProps } from "../_shared/_shared.types";

export default {
  Quiz: {
    user: async ({ userId }: { userId: number | null }) => {
      if (!userId) {
        return null;
      }

      return await client.user.findUnique({
        where: {
          id: userId,
        },
      });
    },
    isMine: ({ userId }: { userId: number | null }, __: any, { auth }: any) => {
      if (!userId) {
        return false;
      }
      return userId === auth?.id;
    },
    quizHashtags: ({ id }: { id: number }) =>
      client.quizHashtag.findMany({
        where: {
          quizs: {
            some: {
              id,
            },
          },
        },
      }),
    canTry: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      }

      const quizTry = await client.quizTry.findFirst({
        where: {
          quizId: id,
          userId: auth.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (quizTry && Date.now() < quizTry.createdAt.getTime() + 300000) {
        return false;
      } else {
        return true;
      }
    },
    nextTry: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return 0;
      }

      const quizTry = await client.quizTry.findFirst({
        where: {
          quizId: id,
          userId: auth.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      if (!quizTry) {
        return 0;
      }

      if (quizTry && Date.now() < quizTry.createdAt.getTime() + 300000) {
        return 0;
      } else {
        return quizTry.createdAt.getTime() + 300000;
      }
    },
    winners: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) => {
      return await client.winnersOnQuizs.findMany({
        where: {
          quizId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
        include: { user: true },
      });
    },
    isWinner: async ({ id }: { id: number }, __: any, { auth }: any) => {
      if (!auth) {
        return false;
      }
      const quiz = await client.winnersOnQuizs.findFirst({
        where: {
          quizId: id,
          userId: auth.id,
        },
        select: {
          id: true,
        },
      });
      if (quiz) {
        return true;
      }
      return false;
    },
    answerRate: async ({ id }: { id: number }) => {
      const totalTries = await client.quizTry.count({ where: { quizId: id } });
      if (totalTries === 0) {
        return 0;
      } else {
        const totalWinners = await client.winnersOnQuizs.count({
          where: { quizId: id },
        });
        return Math.round((totalWinners / totalTries) * 100);
      }
    },
    quizComments: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quizComment.findMany({
        where: {
          quizId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      }),
    totalComments: ({ id }: { id: number }) =>
      client.quizComment.count({
        where: { quizId: id },
      }),
    quizLikes: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quizLike.findMany({
        where: {
          quizId: id,
        },
        orderBy: {
          createdAt: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      }),
    totalLikes: ({ id }: { id: number }) =>
      client.quizLike.count({ where: { quizId: id } }),
    isLiked: async ({ id }: { id: number }, __: any, { auth }: any) => {
      if (!auth) {
        return false;
      }
      const quiz = await client.quizLike.findFirst({
        where: {
          quizId: id,
          userId: auth.id,
        },
      });
      if (quiz) {
        return true;
      }
      return false;
    },
    isBlocked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        const quizBlock = await client.quizBlock.findFirst({
          where: {
            userId: auth.id,
            quizId: id,
          },
          select: {
            id: true,
          },
        });

        if (quizBlock) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  QuizBlock: {
    quiz: ({ quizId }: { quizId: number }) =>
      client.quiz.findUnique({
        where: {
          id: quizId,
        },
      }),
  },
};
