import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    updateQuestionComment: authResolver(
      async (_, { id, content }, { auth }) => {
        if (!content.trim()) {
          return {
            ok: false,
            error: "내용을 입력해주세요.",
          };
        }

        const comment = await client.questionComment.findFirst({
          where: {
            id,
            userId: auth.id,
          },
          select: {
            id: true,
          },
        });
        if (!comment) {
          return {
            ok: false,
            error: "댓글을 찾을 수 없습니다.",
          };
        }

        const updatedComment = await client.questionComment.update({
          where: {
            id,
          },
          data: {
            content: content.trim(),
          },
        });

        return {
          ok: true,
          comment: updatedComment,
        };
      }
    ),
  },
};
