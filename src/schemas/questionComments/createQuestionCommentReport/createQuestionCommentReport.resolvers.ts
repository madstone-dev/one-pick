import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuestionCommentReport: authResolver(
      async (_, { id, type }, { auth }) => {
        if (type < 0 || type > 9) {
          return {
            ok: false,
            error: "올바른 신고 유형이 아닙니다.",
          };
        }

        const questionComment = await client.questionComment.findUnique({
          where: {
            id,
          },
        });

        if (!questionComment) {
          return {
            ok: false,
            error: "댓글을 찾을 수 없습니다.",
          };
        }

        await client.questionCommentReport.create({
          data: {
            userId: auth.id,
            questionCommentId: id,
            type,
          },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
