import { gql } from "apollo-server-core";

export default gql`
  type CreateQuestionResult {
    ok: Boolean!
    error: String
    question: Question
  }

  type Mutation {
    createQuestion(
      content: String!
      image: Upload!
      choice: [String!]!
      questionHashtags: String
    ): CreateQuestionResult!
  }
`;
