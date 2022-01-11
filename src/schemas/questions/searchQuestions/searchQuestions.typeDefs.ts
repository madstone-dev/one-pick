import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchQuestions(
      keyword: String
      isTag: Boolean
      take: Int
      lastId: Int
    ): [Question!]
  }
`;
