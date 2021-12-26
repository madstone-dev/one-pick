import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuizComment: authResolver(async (_, { id }, { auth }) => {
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

      await client.quizComment.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
