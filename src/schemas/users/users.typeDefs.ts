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
    totalQuestions: Int!
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
    isFollowing: Boolean!
    followings(take: Int, lastId: Int): [User]
    followers(take: Int, lastId: Int): [User]
    totalFollowings: Int!
    totalFollowers: Int!
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
