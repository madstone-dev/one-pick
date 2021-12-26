import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Mutation: {
    blockUser: authResolver(async (_, { id }, { auth }) => {
      if (id === auth.id) {
        return {
          ok: false,
          error: "스스로 차단 할 수 없습니다.",
        };
      }
      const user = await client.user.findUnique({
        where: {
          id,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "해당 유저가 없습니다.",
        };
      }

      const userBlock = await client.userBlock.findFirst({
        where: {
          userId: auth.id,
          blockId: id,
        },
      });

      if (userBlock) {
        return {
          ok: false,
          error: "이미 차단한 유저입니다.",
        };
      } else {
        const newBlockedUser = await client.userBlock.create({
          data: {
            userId: auth.id,
            blockId: id,
          },
        });

        return {
          ok: true,
          userBlock: newBlockedUser,
        };
      }
    }),
  },
};
