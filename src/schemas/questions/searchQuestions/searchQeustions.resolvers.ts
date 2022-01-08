import client from "../../../client";

export default {
  Query: {
    searchQuestions: (
      _: any,
      { keyword, isTag, take = 20, lastId }: any,
      { auth }: any
    ) => {
      if (!keyword) {
        return [];
      }
      if (!keyword.trim()) {
        return [];
      }
      return client.question.findMany({
        where: {
          ...(isTag
            ? {
                questionHashtags: {
                  some: {
                    hashtag: keyword,
                  },
                },
              }
            : {
                OR: [
                  {
                    content: {
                      contains: keyword,
                    },
                  },
                  {
                    questionHashtags: {
                      some: {
                        hashtag: keyword,
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
          createdAt: "desc",
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
