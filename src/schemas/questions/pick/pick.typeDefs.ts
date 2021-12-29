import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    pick(id: Int!, pick: Int!): MutationResult!
  }
`;
