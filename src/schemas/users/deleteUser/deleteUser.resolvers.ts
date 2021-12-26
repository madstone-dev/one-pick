import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Mutation: {
    deleteUser: authResolver(async (_, __, { auth }) => {
      await client.user.delete({
        where: {
          id: auth.id,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
