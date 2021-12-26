import client from "../../../client";
import { authResolver } from "../users.utils";

export default {
  Query: {
    me: authResolver(async (_, __, { auth }) =>
      client.user.findUnique({
        where: {
          id: auth.id,
        },
      })
    ),
  },
};
