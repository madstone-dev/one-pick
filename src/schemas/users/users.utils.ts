import jwt from "jsonwebtoken";
import client from "../../client";
import { Context, Resolver } from "../_shared/_shared.types";

export const getUser = async (token: string) => {
  if (!token) {
    return null;
  }
  const verifiedToken: any = jwt.verify(
    token,
    process.env.ACCESS_TOKEN_KEY as string
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
  (next: Resolver) => (root: any, args: any, context: Context, info: any) => {
    if (!context.auth) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인이 필요한 요청입니다.",
        };
      }
    }
    return next(root, args, context, info);
  };

export const adminResolver =
  (next: Resolver) => (root: any, args: any, context: Context, info: any) => {
    if (!context.auth) {
      const query = info.operation.operation === "query";
      if (query) {
        return null;
      } else {
        return {
          ok: false,
          error: "로그인이 필요한 요청입니다.",
        };
      }
    }

    if (context.auth.role !== "admin") {
      return {
        ok: false,
        error: "권한이 없습니다",
      };
    }

    return next(root, args, context, info);
  };
