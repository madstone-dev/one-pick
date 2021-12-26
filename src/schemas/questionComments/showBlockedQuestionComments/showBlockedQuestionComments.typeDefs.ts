import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showBlockedQuestionComments(take: Int, lastId: Int): [QuestionComment]
  }
`;
