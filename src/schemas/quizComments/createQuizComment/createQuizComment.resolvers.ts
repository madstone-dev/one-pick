import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuizComment: authResolver(async (_, { id, content }, { auth }) => {
      const quiz = await client.quiz.findUnique({
        where: {
          id,
        },
        select: { id: true },
      });
      if (!quiz) {
        return {
          ok: false,
          error: "문제를 찾을 수 없습니다.",
        };
      }

      const newComment = await client.quizComment.create({
        data: {
          quizId: id,
          userId: auth.id,
          content,
        },
      });

      return {
        ok: true,
        comment: newComment,
      };
    }),
  },
};
