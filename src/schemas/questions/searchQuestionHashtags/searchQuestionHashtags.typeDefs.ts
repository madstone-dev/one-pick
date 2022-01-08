import { gql } from "apollo-server-core";

export default gql`
  type Query {
    searchQuestionHashtags(keyword: String): [QuestionHashtag]
  }
`;
