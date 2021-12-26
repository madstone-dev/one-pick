import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuestionLike: authResolver(async (_, { id }, { auth }) => {
      const question = await client.question.findUnique({
        where: {
          id,
        },
      });

      if (!question) {
        return {
          ok: false,
          error: "질문을 찾을 수 없습니다.",
        };
      }

      const likeWhere = {
        questionId_userId: {
          questionId: id,
          userId: auth.id,
        },
      };

      const like = await client.questionLike.findUnique({
        where: likeWhere,
      });

      if (like) {
        await client.questionLike.delete({
          where: likeWhere,
        });
      } else {
        await client.questionLike.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            question: {
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
