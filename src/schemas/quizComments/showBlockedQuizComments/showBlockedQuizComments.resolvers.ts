import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showBlockedQuizComments: (
      _: any,
      { take = 20, lastId }: IcursorPaginateProps
    ) => {
      return client.quizCommentBlock.findMany({
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
    },
  },
};
