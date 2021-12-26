import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuizComments(take: Int, lastId: Int): [QuizComment]
  }
`;
