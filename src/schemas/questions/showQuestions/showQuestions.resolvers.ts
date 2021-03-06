import client from "../../../client";
import { Context, IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showQuestions: (
      _: any,
      { take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      return client.question.findMany({
        where: {
          ...(auth && {
            NOT: {
              questionBlocks: {
                some: {
                  userId: auth.id,
                },
              },
            },
          }),
        },
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
