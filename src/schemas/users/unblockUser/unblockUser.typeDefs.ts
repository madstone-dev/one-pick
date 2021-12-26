import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    unblockUser(id: Int!): MutationResult!
  }
`;
