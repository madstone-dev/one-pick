import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuizBlock: authResolver(async (_, { id }, { auth }) => {
      const quiz = await client.quiz.findUnique({
        where: {
          id,
        },
      });

      if (!quiz) {
        return {
          ok: false,
          error: "문제를 찾을 수 없습니다.",
        };
      }

      const blockWhere = {
        quizId_userId: {
          quizId: id,
          userId: auth.id,
        },
      };

      const like = await client.quizBlock.findUnique({
        where: blockWhere,
      });

      if (like) {
        await client.quizBlock.delete({
          where: blockWhere,
        });
      } else {
        await client.quizBlock.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            quiz: {
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
