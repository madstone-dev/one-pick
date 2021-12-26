import client from "../../../client";
import { adminResolver, authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    deleteQuestionCommentReport: adminResolver(async (_, { id }) => {
      const questionCommentReport =
        await client.questionCommentReport.findUnique({
          where: {
            id,
          },
        });

      if (!questionCommentReport) {
        return {
          ok: false,
          error: "권한이 없습니다.",
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
