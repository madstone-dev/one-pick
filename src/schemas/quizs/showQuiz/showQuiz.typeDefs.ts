import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuiz(id: Int!): Quiz
  }
`;
