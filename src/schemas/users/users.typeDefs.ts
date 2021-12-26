import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    social: String
    email: String!
    username: String!
    avatar: JSON_Parsed
    role: String!
    quizs(take: Int, lastId: Int): [Quiz]
    quizTries(take: Int, lastId: Int): [QuizTry]
    conquests(take: Int, lastId: Int): [WinnersOnQuizs]
    totalConquests: Int!
    quizComments(take: Int, lastId: Int): [QuizComment]
    quizLikes(take: Int, lastId: Int): [QuizLike]
    userBlocks(take: Int, lastId: Int): [UserBlock]
    quizBlocks(take: Int, lastId: Int): [QuizBlock]
    quizCommentBlocks(take: Int, lastId: Int): [QuizCommentBlock]
    isBlocked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type UserBlock {
    id: Int!
    user: User
    blockedUser: User
    blockId: Int!
    createdAt: String!
    updatedAt: String!
  }
`;
