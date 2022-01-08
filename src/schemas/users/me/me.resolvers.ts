import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Query: {
    me: authResolver(async (_, __, { auth }) => {
      await client.user.update({
        where: {
          id: auth.id,
        },
        data: {
          lastLogin: Date.now().toString(),
        },
      });

      return client.user.findUnique({
        where: {
          id: auth.id,
        },
      });
    }),
  },
};
