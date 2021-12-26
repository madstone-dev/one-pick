import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuestion(id: Int!): Question
  }
`;
