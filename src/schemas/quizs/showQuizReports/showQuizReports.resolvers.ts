import client from "../../../client";
import { adminResolver } from "../../users/users.utils";

export default {
  Query: {
    showQuizCommentReports: adminResolver(async (_, { take = 20, lastId }) => {
      return client.quizCommentReport.findMany({
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
    }),
  },
};
