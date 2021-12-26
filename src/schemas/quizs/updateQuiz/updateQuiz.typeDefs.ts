import { gql } from "apollo-server-core";

export default gql`
  type UpdateQuizResult {
    ok: Boolean!
    error: String
    quiz: Quiz
  }

  type Mutation {
    updateQuiz(
      id: Int!
      genre: String
      image: Upload
      content: String
      choice: [String]
      answer: String
      quizHashtags: String
    ): UpdateQuizResult!
  }
`;
