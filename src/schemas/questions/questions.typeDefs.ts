import { gql } from "apollo-server-core";

export default gql`
  type Question {
    id: Int!
    user: User
    isMine: Boolean!
    content: String!
    image: JSON_Parsed
    choice: [String!]!
    questionHashtags: [QuestionHashtag]
    pickers(take: Int, lastId: Int): [PickersOnQuestions]
    totalPickers: Int!
    isPicker: Boolean!
    myPick: Int
    questionComments(take: Int, lastId: Int): [QuestionComment]
    totalComments: Int!
    questionLikes(take: Int, lastId: Int): [QuestionLike]
    isLiked: Boolean!
    totalLikes: Int!
    isBlocked: Boolean!
    createdAt: String!
    updatedAt: String!
  }

  type QuestionHashtag {
    id: Int!
    hashtag: String!
    questions: [Question!]!
  }
  type PickersOnQuestions {
    id: Int!
    question: Question
    user: User
  }

  type QuestionLike {
    id: Int!
    user: User!
    question: Question!
  }

  type QuestionBlock {
    id: Int!
    user: User!
    question: Question!
    createdAt: String!
    updatedAt: String!
  }

  type QuestionReport {
    id: Int!
    user: User
    question: Question!
    type: Int!
    message: String
    createdAt: String!
    updatedAt: String!
  }
`;
