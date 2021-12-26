import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    toggleQuizLike: authResolver(async (_, { id }, { auth }) => {
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

      const likeWhere = {
        quizId_userId: {
          quizId: id,
          userId: auth.id,
        },
      };

      const like = await client.quizLike.findUnique({
        where: likeWhere,
      });

      if (like) {
        await client.quizLike.delete({
          where: likeWhere,
        });
      } else {
        await client.quizLike.create({
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
