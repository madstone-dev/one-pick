import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Mutation: {
    pick: authResolver(async (_, { id, pick }, { auth }) => {
      const pickerWhere = {
        questionId_userId: {
          questionId: id,
          userId: auth.id,
        },
      };
      const picker = await client.pickersOnQuestions.findUnique({
        where: pickerWhere,
        select: {
          id: true,
        },
      });

      if (picker) {
        await client.pickersOnQuestions.update({
          where: pickerWhere,
          data: {
            pick,
          },
        });
      } else {
        await client.pickersOnQuestions.create({
          data: {
            questionId: id,
            userId: auth.id,
            pick,
          },
        });
      }

      return {
        ok: true,
      };
    }),
  },
};
