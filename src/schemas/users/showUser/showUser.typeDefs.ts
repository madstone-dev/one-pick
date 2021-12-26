import { gql } from "apollo-server-core";

export default gql`
  type Query {
    showUser(id: Int!): User
  }
`;
