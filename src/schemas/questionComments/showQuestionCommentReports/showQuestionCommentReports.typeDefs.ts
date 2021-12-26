import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuestionCommentReports(take: Int, lastId: Int): [Question]
  }
`;
