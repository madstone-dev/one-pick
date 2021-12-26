import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuestionCommentBlock(id: Int!): MutationResult!
  }
`;
