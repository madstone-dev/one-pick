import client from "../../../client";
import { Context, IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showQuestionComments: (
      _: any,
      { id, take = 20, lastId }: IcursorPaginateProps,
      { auth }: Context
    ) => {
      return client.questionComment.findMany({
        where: {
          questionId: id,
          ...(auth && {
            NOT: {
              questionCommentBlocks: {
                some: {
                  userId: auth.id,
                },
              },
            },
          }),
        },
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
