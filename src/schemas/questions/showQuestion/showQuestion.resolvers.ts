import client from "../../../client";

export default {
  Query: {
    showQuestion: (_: any, { id }: { id: number }) => {
      return client.question.findUnique({
        where: {
          id,
        },
      });
    },
  },
};
