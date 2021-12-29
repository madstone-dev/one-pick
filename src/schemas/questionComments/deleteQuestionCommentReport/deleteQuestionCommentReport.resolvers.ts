import client from "../../../client";
import { adminResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuestionCommentReport: adminResolver(async (_, { id }, { auth }) => {
      const questionCommentReport =
        await client.questionCommentReport.findUnique({
          where: {
            id,
          },
        });

      if (!questionCommentReport) {
        return {
          ok: false,
          error: "리포트가 없습니다.",
        };
      }

      await client.questionCommentReport.delete({
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
