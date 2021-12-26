import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    deleteQuizCommentReport(id: Int!): MutationResult!
  }
`;
