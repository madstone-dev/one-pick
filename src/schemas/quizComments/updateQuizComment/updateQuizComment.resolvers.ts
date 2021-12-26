import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateQuizComment: authResolver(async (_, { id, content }, { auth }) => {
      const comment = await client.quizComment.findFirst({
        where: {
          id,
          userId: auth.id,
        },
        select: {
          id: true,
        },
      });
      if (!comment) {
        return {
          ok: false,
          error: "댓글을 찾을 수 없습니다.",
        };
      }

      const updatedComment = await client.quizComment.update({
        where: {
          id,
        },
        data: {
          content,
        },
      });

      return {
        ok: true,
        comment: updatedComment,
      };
    }),
  },
};
