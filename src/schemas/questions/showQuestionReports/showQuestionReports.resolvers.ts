import client from "../../../client";

export default {
  Query: {
    showQuestionReports: async (_: any, { page = 1, take = 20 }: any) => {
      const totalReports = await client.questionReport.count();

      const reports = await client.questionReport.findMany({
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
