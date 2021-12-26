import { gql } from "apollo-server-core";

export default gql`
  type User {
    id: Int!
    social: String
    email: String!
    username: String!
    avatar: JSON_Parsed
    role: String!
    questions(take: Int, lastId: Int): [Question]
    picks(take: Int, lastId: Int): [PickersOnQuestions]
    totalConquests: Int!
    questionComments(take: Int, lastId: Int): [QuestionComment]
    questionLikes(take: Int, lastId: Int): [QuestionLike]
    userBlocks(take: Int, lastId: Int): [UserBlock]
    questionBlocks(take: Int, lastId: Int): [QuestionBlock]
    questionCommentBlocks(take: Int, lastId: Int): [QuestionCommentBlock]
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
