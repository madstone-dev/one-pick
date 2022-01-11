import client from "../../../client";

export default {
  Query: {
    showQuestionCommentReports: async (
      _: any,
      { page = 1, take = 20 }: any
    ) => {
      const totalReports = await client.questionCommentReport.count();

      const reports = await client.questionCommentReport.findMany({
        orderBy: {
          createdAt: "asc",
        },
        take,
        skip: page > 0 ? (page - 1) * take : 0,
      });

      const lastPage = totalReports === 0 ? 1 : Math.ceil(totalReports / take);

      return {
        totalReports,
        reports,
        lastPage,
      };
    },
  },
};
