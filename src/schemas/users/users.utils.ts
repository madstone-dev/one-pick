import jwt from "jsonwebtoken";
import client from "../../client";
import { Context, Resolver } from "../_shared/_shared.types";

export const getUser = async (token: string) => {
  if (!token) {
    return null;
  }

  const verifiedToken: any = await jwt.verify(
    token,
    process.env.SERVER_KEY as string
  );

  if ("id" in verifiedToken) {
    const user = await client.user.findUnique({
      where: { id: verifiedToken["id"] },
    });
    if (user) {
      return user;
    }
  }
  return null;
};

export const authResolver =
  (next: Resolver) =>
  async (root: any, args: any, context: Context, info: any) => {
    if (context.auth) {
      return next(root, args, context, info);
    } else {
      return tokenValid(context, info);
    }
  };

export const adminResolver =
  (next: Resolver) =>
  async (root: any, args: any, context: Context, info: any) => {
    if (context.auth) {
      if (context.auth.role !== "admin") {
        return {
          ok: false,
          error: "권한이 없습니다",
        };
      }
      return next(root, args, context, info);
    } else {
      return tokenValid(context, info);
    }
  };

const tokenValid = (context: any, info: any) => {
  const token = context.req.headers.authorization;
  const query = info.operation.operation === "query";
  if (token) {
    throw Error("유효한 액세스 토큰이 아닙니다.");
  }
  if (query) {
    return null;
  } else {
    return {
      ok: false,
      error: "로그인이 필요한 요청입니다.",
    };
  }
};
