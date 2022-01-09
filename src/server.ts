import dotenv from "dotenv";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { graphqlUploadExpress } from "graphql-upload";
import express from "express";
import http from "http";
import { schema } from "./schema";
import logger from "morgan";
import { applyMiddleware } from "graphql-middleware";
import { createRateLimitRule } from "graphql-rate-limit";
import { allow, shield } from "graphql-shield";
import depthLimit from "graphql-depth-limit";
import { validAcessToken } from "./server.utils";
dotenv.config();

const PORT = process.env.PORT || 4000;

async function startApolloServer() {
  const app = express();
  app.use(logger("tiny"));
  app.use(graphqlUploadExpress());
  const httpServer = http.createServer(app);

  const rateLimitRule = createRateLimitRule({
    identifyContext: (ctx) => ctx.id,
  });

  const permissions = shield(
    {
      Mutation: {
        createUser: rateLimitRule({
          window: "1s",
          max: 10,
          message: "너무 많은 요청입니다.",
        }),
        login: rateLimitRule({
          window: "1s",
          max: 10,
          message: "너무 많은 요청입니다.",
        }),
        updateUser: rateLimitRule({
          window: "1s",
          max: 10,
          message: "너무 많은 요청입니다.",
        }),
        forgotPassword: rateLimitRule({
          window: "1s",
          max: 5,
          message: "너무 많은 요청입니다.",
        }),
      },
    },
    {
      debug: true,
      fallbackRule: allow,
    }
  );

  const schemaWithMiddleware = applyMiddleware(schema, permissions);

  const server = new ApolloServer({
    schema: schemaWithMiddleware,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req, res }) => {
      const accessToken = req.headers.authorization || "";
      return await validAcessToken({ req, res, accessToken });
    },
    validationRules: [depthLimit(10)],
    introspection: process.env.NODE_ENV !== "production",
  });

  await server.start();

  const whitelist = [
    "http://localhost:3000",
    "https://studio.apollographql.com",
  ];

  const corsOption = {
    origin: function (origin: any, callback: any) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  };
  server.applyMiddleware({
    app,
    path: "/",
    cors: corsOption,
  });

  await new Promise<void>((resolve) => {
    httpServer.listen({ port: PORT }, resolve);
  });
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer();
