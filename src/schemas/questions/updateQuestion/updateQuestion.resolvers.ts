import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import {
  deleteSingleFromS3,
  uploadToS3,
  validateFileExtensions,
} from "../../_shared/_shared.utils";
import { choiceMax, processHashtags } from "../questions.utils";

export default {
  Mutation: {
    updateQuestion: authResolver(
      async (_, { id, title, image, choice, questionHashtags }, { auth }) => {
        const oldQuestion = await client.question.findFirst({
          where: {
            id,
            userId: auth.id,
          },
          include: {
            questionHashtags: {
              select: {
                id: true,
              },
            },
            pickers: {
              select: {
                id: true,
              },
            },
          },
        });
        if (!oldQuestion) {
          return {
            ok: false,
            error: "질문을 찾을 수 없습니다.",
          };
        }

        if (oldQuestion.pickers.length > 0) {
          return {
            ok: false,
            error: "참여자가 있어 수정이 불가능합니다.",
          };
        }

        if (choice) {
          if (choice?.length !== choiceMax) {
            return {
              ok: false,
              error: `보기 ${choiceMax}개를 모두 작성해주세요. `,
            };
          }
        }

        if (title) {
          if (!title.trim()) {
            return {
              ok: false,
              error: "제목을 반드시 입력해주세요",
            };
          }
        }

        if (image && oldQuestion.image) {
          const { Bucket, Key } = JSON.parse(oldQuestion.image);
          const deleteResult = await deleteSingleFromS3(Bucket, Key);
          if (deleteResult.error) {
            return {
              ok: false,
              error: deleteResult.error,
            };
          }
          await client.question.update({
            where: {
              id,
            },
            data: {
              image: null,
            },
          });
        }

        let imageData;
        if (image) {
          const extensions = ["jpg", "jpeg", "png"];
          if (!(await validateFileExtensions(extensions, image))) {
            return {
              ok: false,
              error: "jpg, png 형식의 이미지만 지원됩니다.",
            };
          }

          const uploadResult = await uploadToS3(image, auth.id, "questions");
          if (uploadResult.error) {
            return {
              ok: false,
              error: uploadResult.error,
            };
          } else {
            imageData = JSON.stringify(uploadResult.data);
          }
        }

        const newQuestion = await client.question.update({
          where: {
            id,
          },
          data: {
            title,
            image: imageData,
            choice,
            ...(questionHashtags && {
              questionHashtags: {
                disconnect: oldQuestion.questionHashtags,
                connectOrCreate: processHashtags(questionHashtags),
              },
            }),
          },
        });

        return {
          ok: true,
          question: newQuestion,
        };
      }
    ),
  },
};
