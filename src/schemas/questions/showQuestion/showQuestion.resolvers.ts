import client from "../../../client";

export default {
  Query: {
    showQuestion: (_: any, { id }: { id: number }) =>
      client.question.findUnique({
        where: {
          id,
        },
      }),
  },
};
