import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuizCommentBlock: authResolver(async (_, { id }, { auth }) => {
      const quizComment = await client.quizComment.findUnique({
        where: {
          id,
        },
      });

      if (!quizComment) {
        return {
          ok: false,
          error: "댓글을 찾을 수 없습니다.",
        };
      }

      const blockWhere = {
        userId_quizCommentId: {
          quizCommentId: id,
          userId: auth.id,
        },
      };

      const like = await client.quizCommentBlock.findUnique({
        where: blockWhere,
      });

      if (like) {
        await client.quizCommentBlock.delete({
          where: blockWhere,
        });
      } else {
        await client.quizCommentBlock.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            quizComment: {
              connect: {
                id,
              },
            },
          },
        });
      }

      return {
        ok: true,
      };
    }),
  },
};
