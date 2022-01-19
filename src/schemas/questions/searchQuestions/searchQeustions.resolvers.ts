import client from "../../../client";
import { Context, IcursorPaginateProps } from "../../_shared/_shared.types";

interface IsearchQuestions extends IcursorPaginateProps {
  type: string;
}

export default {
  Query: {
    searchQuestions: (
      _: any,
      { keyword, type, take = 20, lastId }: IsearchQuestions,
      { auth }: Context
    ) => {
      if (keyword?.indexOf("#") === 0) {
        keyword = keyword.slice(1);
      }
      if (!keyword) {
        return [];
      }
      if (!keyword.trim()) {
        return [];
      }
      return client.question.findMany({
        where: {
          ...(type === "hashtag" && {
            questionHashtags: {
              some: {
                hashtag: keyword,
              },
            },
          }),
          ...(type === "text" && {
            OR: [
              {
                content: {
                  contains: keyword,
                },
              },
              {
                questionHashtags: {
                  some: {
                    hashtag: {
                      contains: keyword,
                    },
                  },
                },
              },
            ],
          }),
          ...(auth && {
            NOT: {
              questionBlocks: {
                some: {
                  userId: auth.id,
                },
              },
            },
          }),
        },
        orderBy: {
          id: "desc",
        },
        take,
        skip: lastId ? 1 : 0,
        ...(lastId && {
          cursor: {
            id: lastId,
          },
        }),
      });
    },
  },
};
