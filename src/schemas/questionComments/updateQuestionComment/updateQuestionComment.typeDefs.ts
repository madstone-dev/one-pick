import { gql } from "apollo-server-core";

export default gql`
  type UpdateQuestionCommentResult {
    ok: Boolean!
    error: String
    comment: QuestionComment
  }

  type Mutation {
    updateQuestionComment(
      id: Int!
      content: String!
    ): UpdateQuestionCommentResult!
  }
`;
