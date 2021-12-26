import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showQuestionComments: (
      _: any,
      { take = 20, lastId }: IcursorPaginateProps
    ) => {
      return client.questionComment.findMany({
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
