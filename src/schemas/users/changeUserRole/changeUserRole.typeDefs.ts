import { gql } from "apollo-server-core";

export default gql`
  type Mutation {
    changeUserRole(id: Int!, role: String!): MutationResult!
  }
`;
