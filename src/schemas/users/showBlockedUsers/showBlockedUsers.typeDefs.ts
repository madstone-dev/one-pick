import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showBlockedUsers(take: Int, lastId: Int): [User!]
  }
`;
