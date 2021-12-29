import Cookies from "cookies";
import jwt from "jsonwebtoken";
import client from "../../../client";
import { Context } from "../../_shared/_shared.types";

export default {
  Mutation: {
    refreshToken: async (_: any, __: any, { req, res }: Context) => {
      const cookies = new Cookies(req, res, {
        keys: [process.env.COOKIES_KEY as string],
      });
      const token = cookies.get("refreshToken", { signed: true });
      console.log(token);
      if (token) {
        try {
          const verifiedToken: any = jwt.verify(
            token,
            process.env.COOKIES_KEY as string
          );
          if ("id" in verifiedToken) {
            const user = await client.user.findUnique({
              where: { id: verifiedToken["id"] },
            });
            if (user) {
              const accessToken = await jwt.sign(
                { id: user.id },
                process.env.SERVER_KEY as string
              );

              return {
                ok: true,
                accessToken,
              };
            }
          }
          return {
            ok: false,
            error: "유효한 갱신 토큰이 아닙니다.",
          };
        } catch (error) {
          return {
            ok: false,
            error: "유효한 갱신 토큰이 아닙니다.",
          };
        }
      } else {
        return {
          ok: false,
          error: "유효한 갱신 토큰이 아닙니다.",
        };
      }
    },
  },
};
