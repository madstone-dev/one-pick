import client from "../../../client";

export default {
  Query: {
    showQuiz: (_: any, { id }: { id: number }) =>
      client.quiz.findUnique({
        where: {
          id,
        },
      }),
  },
};
