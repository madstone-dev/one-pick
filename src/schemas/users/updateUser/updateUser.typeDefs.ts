import { gql } from "apollo-server-core";

export default gql`
  type UpdateUserResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    updateUser(
      username: String
      password: String
      avatar: Upload
      fileExists: Boolean!
    ): UpdateUserResult!
  }
`;
