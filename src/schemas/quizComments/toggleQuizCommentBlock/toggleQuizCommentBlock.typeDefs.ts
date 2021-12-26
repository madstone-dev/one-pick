import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuizCommentBlock(id: Int!): MutationResult!
  }
`;
