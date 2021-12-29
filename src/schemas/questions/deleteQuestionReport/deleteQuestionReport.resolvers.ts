import client from "../../../client";
import { adminResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuestionReport: adminResolver(async (_, { id }, { auth }) => {
      const questionReport = await client.questionReport.findUnique({
        where: {
          id,
        },
      });

      if (!questionReport) {
        return {
          ok: false,
          error: "리포트가 없습니다.",
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
