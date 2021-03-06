import client from "../../client";
import { Context, IcursorPaginateProps } from "../_shared/_shared.types";

export default {
  User: {
    questions: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
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
          id: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      }),
    totalQuestions: ({ id }: { id: number }) =>
      client.question.count({ where: { userId: id } }),
    picks: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
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
          id: "desc",
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
          id: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      }),
    totalQuestionComments: ({ id }: { id: number }) =>
      client.questionComment.count({
        where: { userId: id },
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
          id: "desc",
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
          id: "desc",
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
          id: "desc",
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
          id: "desc",
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
    isFollowing: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      }
      const exists = await client.user.count({
        where: {
          username: auth.username,
          followings: {
            some: {
              id,
            },
          },
        },
      });
      return Boolean(exists);
    },
    followings: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      if (!auth) {
        return [];
      }

      return await client.user.findMany({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
        orderBy: {
          id: "desc",
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
    followers: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      if (!auth) {
        return [];
      }

      return await client.user.findMany({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
        orderBy: {
          id: "desc",
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
    totalFollowings: ({ id }: { id: number }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }: { id: number }) =>
      client.user.count({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      }),
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
