import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuestionComments(take: Int, lastId: Int): [QuestionComment]
  }
`;
