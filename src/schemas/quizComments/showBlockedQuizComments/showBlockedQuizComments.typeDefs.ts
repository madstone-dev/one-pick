import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showBlockedQuizComments(take: Int, lastId: Int): [QuizComment]
  }
`;
