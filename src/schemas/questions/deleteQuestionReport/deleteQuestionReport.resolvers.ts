import client from "../../../client";
import { adminResolver, authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuestionReport: adminResolver(async (_, { id }) => {
      const questionReport = await client.questionReport.findUnique({
        where: {
          id,
        },
      });

      if (!questionReport) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      }

      await client.questionReport.delete({
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
