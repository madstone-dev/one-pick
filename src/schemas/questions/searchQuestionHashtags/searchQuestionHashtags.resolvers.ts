import client from "../../../client";

export default {
  Query: {
    searchQuestionHashtags: async (_: any, { keyword }: any) => {
      if (keyword) {
        if (keyword.indexOf("#") === 0) {
          keyword = keyword.slice(1);
        }
      }

      return await client.questionHashtag.findMany({
        where: {
          hashtag: {
            contains: keyword,
          },
        },
        orderBy: {
          hashtag: "asc",
        },
        take: 20,
      });
    },
  },
};
