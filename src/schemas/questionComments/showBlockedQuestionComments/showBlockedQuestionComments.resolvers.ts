import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showBlockedQuestionComments: (
      _: any,
      { take = 20, lastId }: IcursorPaginateProps
    ) => {
      return client.questionCommentBlock.findMany({
        orderBy: {
          id: "desc",
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
