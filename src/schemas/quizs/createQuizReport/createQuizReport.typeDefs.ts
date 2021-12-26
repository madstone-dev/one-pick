import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createQuizReport(id: Int!, type: Int!): MutationResult!
  }
`;
