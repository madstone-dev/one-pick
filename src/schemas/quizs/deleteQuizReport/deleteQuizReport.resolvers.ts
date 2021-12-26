import client from "../../../client";
import { adminResolver, authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuizReport: adminResolver(async (_, { id }) => {
      const quizReport = await client.quizReport.findUnique({
        where: {
          id,
        },
      });

      if (!quizReport) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      }

      await client.quizReport.delete({
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
