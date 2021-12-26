import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showBlockedQuizs(take: Int, lastId: Int): [Quiz]
  }
`;
