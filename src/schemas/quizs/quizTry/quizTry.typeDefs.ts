import { gql } from "apollo-server-core";

export default gql`
  type QuizTryResult {
    ok: Boolean!
    error: String
    result: Boolean
  }

  type Mutation {
    quizTry(id: Int!, answer: String!): QuizTryResult
  }
`;
