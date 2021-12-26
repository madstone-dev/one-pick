import client from "../../../client";
import { Context } from "../../_shared/_shared.types";
import { authResolver } from "../../users/users.utils";

interface IquizTry {
  id: number;
  answer: string;
}

export default {
  Mutation: {
    quizTry: authResolver(
      async (_: any, { id, answer }: IquizTry, { auth }: Context) => {
        {
          const quiz = await client.quiz.findUnique({
            where: {
              id,
            },
          });

          if (!quiz) {
            return {
              ok: false,
              error: "문제를 찾을 수 없습니다.",
            };
          }

          // winner 검사하기
          const winner = await client.winnersOnQuizs.findUnique({
            where: {
              quizId_userId: {
                quizId: id,
                userId: auth.id,
              },
            },
            include: { user: true },
          });
          if (winner?.user?.id === auth.id) {
            return {
              ok: true,
              result: quiz.answer === answer,
            };
          }

          // quiz try 검사하기
          const quizTry = await client.quizTry.findFirst({
            where: {
              quizId: id,
              userId: auth.id,
            },
            orderBy: {
              createdAt: "desc",
            },
          });

          if (quizTry && Date.now() < quizTry.createdAt.getTime() + 300000) {
            const diff = quizTry.createdAt.getTime() + 300000 - Date.now();
            return {
              ok: false,
              error: `${Math.floor(diff / 1000) + 1}초 후 다시 시도해주세요.`,
            };
          }

          if (quiz.answer !== answer) {
            // 틀렸을 때 quiz try model 만들기
            await client.quizTry.create({
              data: {
                userId: auth.id,
                quizId: id,
              },
            });

            return {
              ok: true,
              result: false,
            };
          }

          // 맞췄을 때 winnder record
          await client.winnersOnQuizs.create({
            data: {
              userId: auth.id,
              quizId: id,
            },
          });

          return {
            ok: true,
            result: true,
          };
        }
      }
    ),
  },
};
