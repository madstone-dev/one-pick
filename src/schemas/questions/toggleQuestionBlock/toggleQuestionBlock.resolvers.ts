import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuestionBlock: authResolver(async (_, { id }, { auth }) => {
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

      const blockWhere = {
        questionId_userId: {
          questionId: id,
          userId: auth.id,
        },
      };

      const like = await client.questionBlock.findUnique({
        where: blockWhere,
      });

      if (like) {
        await client.questionBlock.delete({
          where: blockWhere,
        });
      } else {
        await client.questionBlock.create({
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
