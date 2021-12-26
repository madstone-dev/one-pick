import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuestionComment: authResolver(async (_, { id, title }, { auth }) => {
      const question = await client.question.findUnique({
        where: {
          id,
        },
        select: { id: true },
      });
      if (!question) {
        return {
          ok: false,
          error: "질문을 찾을 수 없습니다.",
        };
      }

      const newComment = await client.questionComment.create({
        data: {
          questionId: id,
          userId: auth.id,
          title,
        },
      });

      return {
        ok: true,
        comment: newComment,
      };
    }),
  },
};
