import { gql } from "apollo-server-core";

export default gql`
  type ShowQuestionReportsResult {
    totalReports: Int!
    lastPage: Int!
    reports: [QuestionReport!]
  }

  type Query {
    showQuestionReports(page: Int, take: Int): ShowQuestionReportsResult!
  }
`;
