import client from "../../../client";
import { adminResolver, authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuizCommentReport: adminResolver(async (_, { id }) => {
      const quizCommentReport = await client.quizCommentReport.findUnique({
        where: {
          id,
        },
      });

      if (!quizCommentReport) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      }

      await client.quizCommentReport.delete({
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
