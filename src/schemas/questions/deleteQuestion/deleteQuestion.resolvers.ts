import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import { deleteSingleFromS3 } from "../../_shared/_shared.utils";

export default {
  Mutation: {
    deleteQuestion: authResolver(async (_, { id }, { auth }) => {
      let question;
      if (auth.role === "admin") {
        question = await client.question.findFirst({
          where: {
            id,
          },
        });
      } else {
        question = await client.question.findFirst({
          where: {
            id,
            userId: auth.id,
          },
        });
      }

      if (!question) {
        return {
          ok: false,
          error: "권한이 없습니다.",
        };
      }

      if (question && question.image) {
        const { Bucket, Key } = JSON.parse(question.image);
        const deleteResult = await deleteSingleFromS3(Bucket, Key);
        if (deleteResult.error) {
          return {
            ok: false,
            error: deleteResult.error,
          };
        }
      }

      await client.question.delete({
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
