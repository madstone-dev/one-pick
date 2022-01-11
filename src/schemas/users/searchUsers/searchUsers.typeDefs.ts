import { gql } from "apollo-server-core";

export default gql`
  type SearchUsersResult {
    totalUsers: Int!
    users: [User!]
    lastPage: Int!
  }

  type Query {
    searchUsers(keyword: String, page: Int, take: Int): SearchUsersResult!
  }
`;
