import client from "../../client";
import { Context, IcursorPaginateProps } from "../_shared/_shared.types";

export default {
  User: {
    quizs: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quiz.findMany({
        where: {
          userId: id,
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
    quizTries: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quiz.findMany({
        where: {
          quizTries: {
            some: {
              userId: id,
            },
          },
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
    conquests: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quiz.findMany({
        where: {
          winners: {
            some: {
              userId: id,
            },
          },
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
    totalConquests: ({ id }: { id: number }) =>
      client.winnersOnQuizs.count({ where: { userId: id } }),
    quizComments: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quizComment.findMany({
        where: {
          userId: id,
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
    quizLikes: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.quiz.findMany({
        where: {
          quizLikes: {
            some: {
              userId: id,
            },
          },
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
    userBlocks: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      if (!auth) {
        return [];
      }

      if (auth.id !== id) {
        return [];
      }

      return await client.user.findMany({
        where: {
          userBlocks: {
            some: {
              userId: auth.id,
            },
          },
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
      });
    },
    quizBlocks: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      if (!auth) {
        return [];
      }

      if (auth.id !== id) {
        return [];
      }

      return await client.quiz.findMany({
        where: {
          quizBlocks: {
            some: {
              userId: id,
            },
          },
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
      });
    },
    quizCommentBlocks: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      if (!auth) {
        return [];
      }

      if (auth.id !== id) {
        return [];
      }

      return await client.quizComment.findMany({
        where: {
          quizCommentBlocks: {
            some: {
              userId: id,
            },
          },
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
      });
    },
    isBlocked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        const userBlock = await client.userBlock.findFirst({
          where: {
            userId: auth.id,
            blockId: id,
          },
          select: {
            id: true,
          },
        });

        if (userBlock) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  UserBlock: {
    blockedUser: ({ blockId }: { blockId: number }) =>
      client.user.findUnique({
        where: {
          id: blockId,
        },
      }),
  },
};
