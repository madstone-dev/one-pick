import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteQuestionComment(id: Int!): MutationResult!
  }
`;
