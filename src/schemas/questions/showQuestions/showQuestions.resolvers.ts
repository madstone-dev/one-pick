import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showQuestions: (_: any, { take = 20, lastId }: IcursorPaginateProps) => {
      return client.question.findMany({
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
