import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuizs(take: Int, lastId: Int): [Quiz]
  }
`;
