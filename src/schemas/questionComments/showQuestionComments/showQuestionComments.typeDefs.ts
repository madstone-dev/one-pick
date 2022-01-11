import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showQuestionComments(id: Int!, take: Int, lastId: Int): [QuestionComment!]!
  }
`;
