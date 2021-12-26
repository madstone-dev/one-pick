import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuizReports(take: Int, lastId: Int): [Quiz]
  }
`;
