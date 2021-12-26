import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuizBlock(id: Int!): MutationResult!
  }
`;
