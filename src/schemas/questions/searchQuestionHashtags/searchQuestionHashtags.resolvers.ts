import client from "../../../client";

export default {
  Query: {
    searchQuestionHashtags: (_: any, { keyword }: any) =>
      client.questionHashtag.findMany({
        where: {
          hashtag: {
            contains: keyword,
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20,
      }),
  },
};
