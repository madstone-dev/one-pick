import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    forgotPassword(email: String!): MutationResult!
  }
`;
