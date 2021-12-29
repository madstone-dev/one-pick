import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    createQuestionComment: authResolver(
      async (_, { id, content }, { auth }) => {
        const question = await client.question.findUnique({
          where: {
            id,
          },
          select: { id: true },
        });
        if (!question) {
          return {
            ok: false,
            error: "질문을 찾을 수 없습니다.",
          };
        }

        const picker = await client.pickersOnQuestions.findUnique({
          where: {
            questionId_userId: {
              questionId: id,
              userId: auth.id,
            },
          },
        });
        if (!picker) {
          return {
            ok: false,
            error: "댓글은 선택 후 남길 수 있습니다.",
          };
        }

        const newComment = await client.questionComment.create({
          data: {
            questionId: id,
            userId: auth.id,
            content,
            pick: picker.pick,
          },
        });

        return {
          ok: true,
          comment: newComment,
        };
      }
    ),
  },
};
