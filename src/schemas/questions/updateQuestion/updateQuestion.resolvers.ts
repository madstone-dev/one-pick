import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import {
  deleteSingleFromS3,
  uploadToS3,
  validateFileExtensions,
} from "../../_shared/_shared.utils";
import {
  choiceMax,
  processHashtags,
  processHashtagsString,
} from "../questions.utils";

export default {
  Mutation: {
    updateQuestion: authResolver(
      async (_, { id, content, image, choice, questionHashtags }, { auth }) => {
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

        let trimedChoice;
        if (choice) {
          if (choice?.length !== choiceMax) {
            return {
              ok: false,
              error: `보기 ${choiceMax}개를 모두 작성해주세요. `,
            };
          }

          for (let i = 0; i < choice.length; i++) {
            if (!choice[i].trim()) {
              return {
                ok: false,
                error: "선택지 내용을 반드시 입력해주세요",
              };
            }
          }

          trimedChoice = choice.map((c: string) => c.trim());
        }

        if (content) {
          if (!content.trim()) {
            return {
              ok: false,
              error: "내용을 반드시 입력해주세요",
            };
          }
        }

        const removeOldImage = async () => {
          if (oldQuestion.image) {
            const { Bucket, Key } = JSON.parse(oldQuestion.image);
            const deleteResult = await deleteSingleFromS3(Bucket, Key);
            if (deleteResult.error) {
              return {
                ok: false,
                error: deleteResult.error,
              };
            }
          }
        };

        let imageData;
        if (image) {
          await removeOldImage();
          const extensions = ["jpg", "jpeg", "png"];
          if (!(await validateFileExtensions(extensions, image))) {
            return {
              ok: false,
              error: "jpg, png 형식의 이미지만 지원됩니다.",
            };
          }
          const { size } = await image;
          if (size > 5242880) {
            return {
              ok: false,
              error: "최대 5mb 까지만 가능합니다.",
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
            content: content.trim(),
            image: imageData,
            ...(choice && {
              choice: trimedChoice,
            }),
            ...(questionHashtags && {
              hashtagString: processHashtagsString(questionHashtags).join(" "),
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
