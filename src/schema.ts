import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.*`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.*`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers: any = mergeResolvers(loadedResolvers);
export const schema = makeExecutableSchema({ typeDefs, resolvers });
