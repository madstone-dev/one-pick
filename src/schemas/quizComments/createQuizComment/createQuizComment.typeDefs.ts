import { gql } from "apollo-server-core";

export default gql`
  type CreateQuizCommentResult {
    ok: Boolean!
    error: String
    comment: QuizComment
  }

  type Mutation {
    createQuizComment(id: Int!, content: String!): CreateQuizCommentResult!
  }
`;
