import { gql } from "apollo-server-core";

export default gql`
  type UpdateQuizCommentResult {
    ok: Boolean!
    error: String
    comment: QuizComment
  }

  type Mutation {
    updateQuizComment(id: Int!, content: String!): UpdateQuizCommentResult!
  }
`;
