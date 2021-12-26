import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import { deleteSingleFromS3 } from "../../_shared/_shared.utils";

export default {
  Mutation: {
    deleteQuiz: authResolver(async (_, { id }, { auth }) => {
      const quiz = await client.quiz.findFirst({
        where: {
          id,
          userId: auth.id,
        },
      });

      if (!quiz) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      }

      if (quiz && quiz.image) {
        const { Bucket, Key } = JSON.parse(quiz.image);
        const deleteResult = await deleteSingleFromS3(Bucket, Key);
        if (deleteResult.error) {
          return {
            ok: false,
            error: deleteResult.error,
          };
        }
      }

      await client.quiz.delete({
        where: {
          id,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
