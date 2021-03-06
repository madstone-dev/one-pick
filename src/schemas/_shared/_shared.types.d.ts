import { User } from "@prisma/client";

export interface Context {
  req: any;
  res: any;
  auth: User;
}

export interface IpaginateProps {
  id?: number;
  keyword?: string;
  take: number;
}

export interface IcursorPaginateProps extends IpaginateProps {
  lastId: number;
}

export interface IoffsetPaginateProps extends IpaginateProps {
  page: number;
}

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
