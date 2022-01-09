import { gql } from "apollo-server-core";

export default gql`
  type UpdateQuestionResult {
    ok: Boolean!
    error: String
    question: Question
  }

  type Mutation {
    updateQuestion(
      id: Int!
      content: String
      image: Upload
      choice: [String]
      questionHashtags: String
    ): UpdateQuestionResult!
  }
`;
