import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createQuestionReport(id: Int!, type: Int!): MutationResult!
  }
`;
