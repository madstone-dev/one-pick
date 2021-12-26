import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Mutation: {
    unblockUser: authResolver(async (_, { id }, { auth }) => {
      const userBlock = await client.userBlock.findFirst({
        where: {
          id,
          userId: auth.id,
        },
      });

      if (!userBlock) {
        return {
          ok: false,
          error: "차단된 유저가 없습니다.",
        };
      } else {
        await client.userBlock.delete({
          where: {
            id,
          },
        });

        return {
          ok: true,
        };
      }
    }),
  },
};
