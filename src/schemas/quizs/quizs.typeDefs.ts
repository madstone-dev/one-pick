import { gql } from "apollo-server-core";

export default gql`
  type Quiz {
    id: Int!
    user: User
    isMine: Boolean!
    type: String!
    genre: String!
    image: JSON_Parsed
    content: String!
    choice: [String]
    answer: String!
    quizHashtags: [QuizHashtag]
    canTry: Boolean
    nextTry: Int
    winners(take: Int, lastId: Int): [WinnersOnQuizs]
    isWinner: Boolean!
    answerRate: Int!
    quizComments(take: Int, lastId: Int): [QuizComment]
    totalComments: Int!
    quizLikes(take: Int, lastId: Int): [QuizLike]
    isLiked: Boolean!
    totalLikes: Int!
    isBlocked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type QuizHashtag {
    id: Int!
    hashtag: String!
    quizs: [Quiz!]!
  }

  type QuizTry {
    id: Int!
    user: User
    quiz: Quiz!
    createdAt: String!
    updatedAt: String!
  }

  type WinnersOnQuizs {
    id: Int!
    quiz: Quiz
    user: User
  }

  type QuizLike {
    id: Int!
    user: User!
    quiz: Quiz!
  }

  type QuizBlock {
    id: Int!
    user: User!
    quiz: Quiz!
    createdAt: String!
    updatedAt: String!
  }

  type QuizReport {
    id: Int!
    user: User
    quiz: Quiz!
    type: Int!
    message: String
    createdAt: String!
    updatedAt: String!
  }
`;
