import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuizCommentReports(take: Int, lastId: Int): [Quiz]
  }
`;
