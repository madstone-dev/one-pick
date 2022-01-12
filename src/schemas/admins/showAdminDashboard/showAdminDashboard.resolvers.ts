import client from "../../../client";
import { authResolver } from "../../users/users.utils";

export default {
  Query: {
    showAdminDashboard: authResolver(async (_, __, { auth }) => {
      if (auth.role !== "admin") {
        return {
          totalUsers: 0,
          totalQuestionReports: 0,
          totalQuestionCommentReports: 0,
        };
      }

      const totalUsers = await client.user.count();
      const totalQuestionReports = await client.questionReport.count();
      const totalQuestionCommentReports =
        await client.questionCommentReport.count();

      return {
        totalUsers,
        totalQuestionReports,
        totalQuestionCommentReports,
      };
    }),
  },
};
