import { gql } from "apollo-server-core";

export default gql`
  type BlockUserResult {
    ok: Boolean!
    error: String
    userBlock: UserBlock
  }

  type Mutation {
    blockUser(id: Int!): BlockUserResult!
  }
`;
