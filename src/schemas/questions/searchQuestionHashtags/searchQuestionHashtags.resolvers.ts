import client from "../../../client";
import { IcursorPaginateProps } from "../../_shared/_shared.types";

export default {
  Query: {
    searchQuestionHashtags: async (
      _: any,
      { keyword }: IcursorPaginateProps
    ) => {
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
