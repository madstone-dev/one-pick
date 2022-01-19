import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    showBlockedUsers: (_: any, { take = 20, lastId }: IcursorPaginateProps) =>
      client.userBlock.findMany({
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
      }),
  },
};
