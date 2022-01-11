import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showUsers(take: Int, lastId: Int): [User!]
  }
`;
