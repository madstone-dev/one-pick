import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import {
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
    createQuestion: authResolver(
      async (
        _,
        { content, image, choice = [], questionHashtags },
        { auth }
      ) => {
        if (!content.trim()) {
          return {
            ok: false,
            error: "내용을 반드시 입력해주세요",
          };
        }

        if (choice?.length !== choiceMax) {
          return {
            ok: false,
            error: `선택지 ${choiceMax}개를 모두 작성해주세요. `,
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

        const trimedChoice = choice.map((c: string) => c.trim());

        let imageData;
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

        const newQuestion = await client.question.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            content: content.trim(),
            image: imageData,
            choice: trimedChoice,
            hashtagString: processHashtagsString(questionHashtags).join(" "),
            questionHashtags: {
              connectOrCreate: processHashtags(questionHashtags),
            },
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
