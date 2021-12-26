import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    createQuestionCommentReport(id: Int!, type: Int!): MutationResult!
  }
`;
