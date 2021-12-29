import client from "../../../client";
import { adminResolver } from "../../users/users.utils";

export default {
  Query: {
    showQuestionCommentReports: adminResolver(
      async (_, { take = 20, lastId }, { auth }) => {
        return client.questionCommentReport.findMany({
          orderBy: {
            createdAt: "desc",
          },
          take,
          skip: lastId ? 1 : 0,
          ...(lastId && {
            cursor: {
              id: lastId,
            },
          }),
        });
      }
    ),
  },
};
