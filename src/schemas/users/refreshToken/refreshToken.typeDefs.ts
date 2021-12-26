import { gql } from "apollo-server-core";

export default gql`
  type RefreshTokenResult {
    ok: Boolean!
    error: String
    accessToken: String
  }

  type Mutation {
    refreshToken: RefreshTokenResult!
  }
`;
