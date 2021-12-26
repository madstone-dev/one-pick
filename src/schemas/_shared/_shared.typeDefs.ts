import { gql } from "apollo-server-core";

export default gql`
  scalar Upload
  scalar JSON_Parsed

  type MutationResult {
    ok: Boolean!
    error: String
  }
`;
