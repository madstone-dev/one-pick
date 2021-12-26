import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuestionLike(id: Int!): MutationResult!
  }
`;
