import { GraphQLScalarType } from "graphql";
import { GraphQLUpload } from "graphql-upload";

const jsonParsedScalar = new GraphQLScalarType({
  name: "JSON_Parsed",
  description: "JSON_Parsed custom scalar type",
  serialize(value) {
    return JSON.parse(value);
  },
});

export default {
  Upload: GraphQLUpload,
  JSON_Parsed: jsonParsedScalar,
};
