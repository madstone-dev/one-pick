import client from "../../../client";

export default {
  Query: {
    showUser: (_: any, { id }: { id: number }) =>
      client.user.findUnique({
        where: {
          id,
        },
      }),
  },
};
