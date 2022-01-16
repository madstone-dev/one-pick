import { gql } from "apollo-server-core";

export default gql`
  type QuestionUserPicks {
    first: Int!
    second: Int!
    total: Int!
  }

  type Question {
    id: Int!
    user: User
    isMine: Boolean!
    content: String!
    image: JSON_Parsed
    choice: [String!]!
    hashtagString: String
    questionHashtags: [QuestionHashtag!]!
    pickers(take: Int, lastId: Int): [PickersOnQuestions!]!
    totalPickers: Int!
    isPicker: Boolean!
    myPick: Int
    userPicks: QuestionUserPicks!
    questionComments(take: Int, lastId: Int): [QuestionComment!]!
    totalComments: Int!
    questionLikes(take: Int, lastId: Int): [QuestionLike!]!
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
    totalQuestions: Int!
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
    createdAt: String!
    updatedAt: String!
  }
`;
