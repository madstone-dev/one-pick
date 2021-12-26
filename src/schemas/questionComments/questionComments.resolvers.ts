import client from "../../client";
import { Context } from "../_shared/_shared.types";

export default {
  QuestionComment: {
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
    question: ({ questionId }: { questionId: number }) =>
      client.question.findUnique({
        where: {
          id: questionId,
        },
      }),
    isBlocked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        const questionCommentBlock =
          await client.questionCommentBlock.findFirst({
            where: {
              userId: auth.id,
              questionCommentId: id,
            },
            select: {
              id: true,
            },
          });

        if (questionCommentBlock) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  QuestionCommentBlock: {
    questionComment: ({ questionCommentId }: { questionCommentId: number }) =>
      client.questionComment.findUnique({
        where: {
          id: questionCommentId,
        },
      }),
  },
};
