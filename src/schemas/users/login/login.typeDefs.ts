import { gql } from "apollo-server-core";

export default gql`
  type LoginResult {
    ok: Boolean!
    error: String
    accessToken: String
  }

  type Mutation {
    login(email: String!, password: String!): LoginResult
  }
`;
