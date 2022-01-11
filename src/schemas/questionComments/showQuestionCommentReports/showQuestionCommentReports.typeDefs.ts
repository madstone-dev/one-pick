import { gql } from "apollo-server-core";

export default gql`
  type ShowQuestionCommentReportsResult {
    totalReports: Int!
    lastPage: Int!
    reports: [QuestionCommentReport!]!
  }

  type Query {
    showQuestionCommentReports(
      page: Int
      take: Int
    ): ShowQuestionCommentReportsResult!
  }
`;
