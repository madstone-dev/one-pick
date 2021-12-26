import { gql } from "apollo-server-core";

export default gql`
  type CreateQuizResult {
    ok: Boolean!
    error: String
    quiz: Quiz
  }

  type Mutation {
    createQuiz(
      genre: String!
      image: Upload
      content: String!
      choice: [String]
      answer: String!
      quizHashtags: String
    ): CreateQuizResult!
  }
`;
