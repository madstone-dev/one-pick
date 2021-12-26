import { gql } from "apollo-server-core";

export default gql`
  type QuizComment {
    id: Int!
    user: User!
    quiz: Quiz!
    content: String!
    isBlocked: Boolean!
  }

  type QuizCommentBlock {
    id: Int!
    uesr: User!
    quizComment: QuizComment
    createdAt: String!
    updatedAt: String!
  }

  type QuizCommentReport {
    id: Int!
    uesr: User!
    quizComment: QuizComment
    type: Int!
    message: String
    createdAt: String!
    updatedAt: String!
  }
`;
