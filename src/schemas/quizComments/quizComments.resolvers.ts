import client from "../../client";
import { Context } from "../_shared/_shared.types";

export default {
  QuizComment: {
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
    quiz: ({ quizId }: { quizId: number }) =>
      client.quiz.findUnique({
        where: {
          id: quizId,
        },
      }),
    isBlocked: async ({ id }: { id: number }, __: any, { auth }: Context) => {
      if (!auth) {
        return false;
      } else {
        const quizCommentBlock = await client.quizCommentBlock.findFirst({
          where: {
            userId: auth.id,
            quizCommentId: id,
          },
          select: {
            id: true,
          },
        });

        if (quizCommentBlock) {
          return true;
        } else {
          return false;
        }
      }
    },
  },
  QuizCommentBlock: {
    quizComment: ({ quizCommentId }: { quizCommentId: number }) =>
      client.quizComment.findUnique({
        where: {
          id: quizCommentId,
        },
      }),
  },
};
