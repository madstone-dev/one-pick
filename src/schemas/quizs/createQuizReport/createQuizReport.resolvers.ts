import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuizReport: authResolver(async (_, { id, type }, { auth }) => {
      if (type < 0 || type > 9) {
        return {
          ok: false,
          error: "올바른 신고 유형이 아닙니다.",
        };
      }

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

      await client.quizReport.create({
        data: {
          userId: auth.id,
          quizId: id,
          type,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
