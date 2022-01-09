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
    picks(take: Int, lastId: Int): [Question]
    totalPicks: Int!
    questionComments(take: Int, lastId: Int): [QuestionComment]
    totalQuestionComments: Int!
    questionLikes(take: Int, lastId: Int): [QuestionLike]
    userBlocks(take: Int, lastId: Int): [UserBlock]
    questionBlocks(take: Int, lastId: Int): [Question]
    questionCommentBlocks(take: Int, lastId: Int): [QuestionComment]
    isBlocked: Boolean!
    isMe: Boolean!
    lastLogin: String
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
