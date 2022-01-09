import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Mutation: {
    toggleFollowUser: authResolver(async (_, { id }, { auth }) => {
      const user = await client.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "유저를 찾을 수 없습니다.",
        };
      }

      const isFollowing = await client.user.findFirst({
        where: {
          followings: {
            some: {
              id,
            },
          },
        },
      });

      await client.user.update({
        where: {
          id: auth.id,
        },
        data: {
          followings: {
            ...(isFollowing
              ? {
                  disconnect: {
                    id,
                  },
                }
              : {
                  connect: {
                    id,
                  },
                }),
          },
        },
      });
      return {
        ok: true,
      };
    }),
  },
};
