import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    toggleQuizLike(id: Int!): MutationResult!
  }
`;
