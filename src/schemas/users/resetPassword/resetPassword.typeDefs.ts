import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    resetPassword(
      email: String!
      token: String!
      password: String!
    ): MutationResult!
  }
`;
