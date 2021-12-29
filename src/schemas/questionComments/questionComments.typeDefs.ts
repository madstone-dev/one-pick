import { gql } from "apollo-server-core";

export default gql`
  type QuestionComment {
    id: Int!
    user: User!
    question: Question!
    content: String!
    isBlocked: Boolean!
    pick: Int!
  }

  type QuestionCommentBlock {
    id: Int!
    uesr: User!
    questionComment: QuestionComment
    createdAt: String!
    updatedAt: String!
  }

  type QuestionCommentReport {
    id: Int!
    uesr: User!
    questionComment: QuestionComment
    type: Int!
    message: String
    createdAt: String!
    updatedAt: String!
  }
`;
