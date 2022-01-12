import { gql } from "apollo-server-core";

export default gql`
  type ShowAdminDashboardResult {
    totalUsers: Int!
    totalQuestionReports: Int!
    totalQuestionCommentReports: Int!
  }

  type Query {
    showAdminDashboard: ShowAdminDashboardResult!
  }
`;
