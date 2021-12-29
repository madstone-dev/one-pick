import { gql } from "apollo-server-core";

export default gql`
  type CreateQuestionCommentResult {
    ok: Boolean!
    error: String
    comment: QuestionComment
  }

  type Mutation {
    createQuestionComment(
      id: Int!
      content: String!
    ): CreateQuestionCommentResult!
  }
`;
