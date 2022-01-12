import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchQuestions(
      keyword: String
      type: String!
      take: Int
      lastId: Int
    ): [Question!]
  }
`;
