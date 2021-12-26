import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuestionBlock(id: Int!): MutationResult!
  }
`;
