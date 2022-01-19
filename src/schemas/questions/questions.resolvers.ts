import client from "../../client";
import { Context, IcursorPaginateProps } from "../_shared/_shared.types";

export default {
  Question: {
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
    isMine: (
      { userId }: { userId: number | null },
      __: any,
      { auth }: Context
    ) => {
      if (!userId) {
        return false;
      }
      return userId === auth?.id;
    },
    questionHashtags: ({ id }: { id: number }) =>
      client.questionHashtag.findMany({
        where: {
          questions: {
            some: {
              id,
            },
          },
        },
      }),
    pickers: async (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) => {
      return await client.pickersOnQuestions.findMany({
        where: {
          questionId: id,
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
        include: { user: true },
      });
    },
    totalPickers: ({ id }: { id: number }) =>
      client.pickersOnQuestions.count({
        where: {
          questionId: id,
        },
      }),
    isPicker: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      }
      const question = await client.pickersOnQuestions.findFirst({
        where: {
          questionId: id,
          userId: auth.id,
        },
        select: {
          id: true,
        },
      });
      if (question) {
        return true;
      }
      return false;
    },
    myPick: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return;
      }
      const pick = await client.pickersOnQuestions.findFirst({
        where: {
          questionId: id,
          userId: auth.id,
        },
        select: {
          pick: true,
        },
      });
      if (pick) {
        return pick.pick;
      } else {
        return;
      }
    },
    userPicks: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      const first = await client.pickersOnQuestions.count({
        where: {
          questionId: id,
          pick: 1,
        },
      });

      const second = await client.pickersOnQuestions.count({
        where: {
          questionId: id,
          pick: 2,
        },
      });

      const total = first + second;

      if (!auth) {
        return {
          first: 0,
          second: 0,
          total,
        };
      }

      const myPick = await client.pickersOnQuestions.findFirst({
        where: {
          questionId: id,
          userId: auth.id,
        },
        select: {
          pick: true,
        },
      });

      if (!myPick) {
        return {
          first: 0,
          second: 0,
          total,
        };
      }

      return {
        first,
        second,
        total,
      };
    },
    questionComments: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.questionComment.findMany({
        where: {
          questionId: id,
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
    totalComments: ({ id }: { id: number }) =>
      client.questionComment.count({
        where: { questionId: id },
      }),
    questionLikes: (
      { id }: { id: number },
      { take = 20, lastId }: IcursorPaginateProps
    ) =>
      client.questionLike.findMany({
        where: {
          questionId: id,
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
    totalLikes: ({ id }: { id: number }) =>
      client.questionLike.count({ where: { questionId: id } }),
    isLiked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      }
      const question = await client.questionLike.findFirst({
        where: {
          questionId: id,
          userId: auth.id,
        },
      });
      if (question) {
        return true;
      }
      return false;
    },
    isBlocked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        const questionBlock = await client.questionBlock.findFirst({
          where: {
            userId: auth.id,
            questionId: id,
          },
          select: {
            id: true,
          },
        });

        if (questionBlock) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  QuestionHashtag: {
    totalQuestions: ({ id }: { id: number }) =>
      client.question.count({
        where: {
          questionHashtags: {
            some: { id },
          },
        },
      }),
  },
  QuestionBlock: {
    question: ({ questionId }: { questionId: number }) =>
      client.question.findUnique({
        where: {
          id: questionId,
        },
      }),
  },
  QuestionReport: {
    question: ({ questionId }: { questionId: number }) =>
      client.question.findUnique({
        where: {
          id: questionId,
        },
      }),
  },
};
