import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuestions(take: Int, lastId: Int): [Question]
  }
`;
