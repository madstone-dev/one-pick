import { User } from "@prisma/client";

export interface Context {
  req: any;
  res: any;
  auth: User;
}

export type IcursorPaginateProps = {
  id?: number;
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
