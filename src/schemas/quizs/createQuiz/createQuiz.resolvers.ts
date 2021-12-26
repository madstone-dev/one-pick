import client from "../../../client";
import { authResolver } from "../../users/users.utils";
import {
  uploadToS3,
  validateFileExtensions,
} from "../../_shared/_shared.utils";
import {
  choiceMax,
  choiceMin,
  processHashtags,
  validateGenres,
  validGenres,
} from "../quizs.utils";

export default {
  Mutation: {
    createQuiz: authResolver(
      async (
        _,
        { genre, image, content, choice = [], answer, quizHashtags },
        { auth }
      ) => {
        if (answer < choiceMin || answer > choiceMax) {
          return {
            ok: false,
            error: "정답 유형이 올바르지 않습니다.",
          };
        }

        if (choice?.length !== choiceMax) {
          return {
            ok: false,
            error: `보기 ${choiceMax}개를 모두 작성해주세요. `,
          };
        }

        if (!genre || !validateGenres(genre)) {
          return {
            ok: false,
            error: `올바르지 않은 장르입니다. 등록가능한 장르 : ${validGenres.join(
              ","
            )}`,
          };
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

          const uploadResult = await uploadToS3(image, auth.id, "quizs");
          if (uploadResult.error) {
            return {
              ok: false,
              error: uploadResult.error,
            };
          } else {
            imageData = JSON.stringify(uploadResult.data);
          }
        }

        const newQuiz = await client.quiz.create({
          data: {
            user: {
              connect: {
                id: auth.id,
              },
            },
            genre,
            image: imageData,
            content,
            choice,
            answer,
            quizHashtags: {
              connectOrCreate: processHashtags(quizHashtags),
            },
          },
        });

        return {
          ok: true,
          quiz: newQuiz,
        };
      }
    ),
  },
};
