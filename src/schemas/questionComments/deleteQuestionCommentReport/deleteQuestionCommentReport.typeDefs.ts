import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteQuestionCommentReport(id: Int!): MutationResult!
  }
`;
