import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuestionCommentBlock: authResolver(async (_, { id }, { auth }) => {
      const questionComment = await client.questionComment.findUnique({
        where: {
          id,
        },
      });

      if (!questionComment) {
        return {
          ok: false,
          error: "댓글을 찾을 수 없습니다.",
        };
      }

      const blockWhere = {
        userId_questionCommentId: {
          questionCommentId: id,
          userId: auth.id,
        },
      };

      const like = await client.questionCommentBlock.findUnique({
        where: blockWhere,
      });

      if (like) {
        await client.questionCommentBlock.delete({
          where: blockWhere,
        });
      } else {
        await client.questionCommentBlock.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            questionComment: {
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
