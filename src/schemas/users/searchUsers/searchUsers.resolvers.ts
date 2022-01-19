import client from "../../../client";
import { IoffsetPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    searchUsers: async (
      _: any,
      { keyword, page = 1, take = 20 }: IoffsetPaginateProps
    ) => {
      const totalUsers = await client.user.count({
        ...(keyword && {
          where: {
            username: {
              contains: keyword,
            },
          },
        }),
      });

      const users = await client.user.findMany({
        ...(keyword && {
          where: {
            username: {
              contains: keyword,
            },
          },
        }),
        orderBy: {
          id: "desc",
        },
        take,
        skip: page > 0 ? (page - 1) * take : 0,
      });

      const lastPage = totalUsers === 0 ? 1 : Math.ceil(totalUsers / take);

      return {
        totalUsers,
        users,
        lastPage,
      };
    },
  },
};
