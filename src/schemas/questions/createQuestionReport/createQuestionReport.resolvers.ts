import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuestionReport: authResolver(async (_, { id, type }, { auth }) => {
      if (type < 0 || type > 9) {
        return {
          ok: false,
          error: "올바른 신고 유형이 아닙니다.",
        };
      }

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

      await client.questionReport.create({
        data: {
          userId: auth.id,
          questionId: id,
          type,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
