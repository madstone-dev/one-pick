import { gql } from "apollo-server-core";

export default gql`
  type UpdateUserResult {
    ok: Boolean!
    error: String
    user: User
  }

  type Mutation {
    updateUser(password: String, avatar: Upload): UpdateUserResult!
  }
`;
