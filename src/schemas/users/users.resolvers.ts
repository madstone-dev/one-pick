import client from "../../client";
import { Context, IcursorPaginateProps } from "../_shared/_shared.types";

export default {
  User: {
    questions: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: any
    ) =>
      client.question.findMany({
        where: {
          userId: id,
          ...(auth && {
            NOT: {
              questionBlocks: {
                some: {
                  userId: auth.id,
                },
              },
            },
          }),
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
    picks: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: any
    ) =>
      client.question.findMany({
        where: {
          pickers: {
            some: {
              userId: id,
            },
          },
          ...(auth && {
            NOT: {
              questionBlocks: {
                some: {
                  userId: auth.id,
                },
              },
            },
          }),
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
    totalPicks: ({ id }: { id: number }) =>
      client.pickersOnQuestions.count({ where: { userId: id } }),
    questionComments: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.questionComment.findMany({
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
    questionLikes: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.question.findMany({
        where: {
          questionLikes: {
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
    questionBlocks: async (
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

      return await client.question.findMany({
        where: {
          questionBlocks: {
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
    questionCommentBlocks: async (
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

      return await client.questionComment.findMany({
        where: {
          questionCommentBlocks: {
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
    isMe: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        return id === auth.id;
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
