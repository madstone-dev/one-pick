import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showBlockedQuestions(take: Int, lastId: Int): [Question]
  }
`;
