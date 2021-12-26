import { User } from "@prisma/client";
import { Session } from "express-session";

type Context = {
  auth: User;
  session: any;
};

export type IcursorPaginateProps = {
  take: number;
  lastId: number;
};

export type Resolver = (
  root: any,
  args: any,
  context: Context,
  info: any
) => any;

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver;
  };
};
