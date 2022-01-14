import Cookies from "cookies";
import { Context } from "../../_shared/_shared.types";

export default {
  Mutation: {
    logout: async (_: any, __: any, { req, res, auth }: Context) => {
      const cookies = new Cookies(req, res, {
        keys: [process.env.COOKIES_KEY as string],
      });

      cookies.set("refreshToken", "deleted", {
        maxAge: -1,
        secureProxy: true,
        path: "/",
      });

      return {
        ok: true,
      };
    },
  },
};
