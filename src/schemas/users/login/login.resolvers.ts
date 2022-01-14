import client from "../../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import { Context } from "../../_shared/_shared.types";

interface IloginForm {
  email: string;
  password: string;
}

export default {
  Mutation: {
    login: async (
      _: any,
      { email, password }: IloginForm,
      { req, res }: Context
    ) => {
      const user = await client.user.findUnique({
        where: {
          email,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: "해당 이메일이 존재하지 않습니다.",
        };
      }

      const passwordCheck = await bcrypt.compare(password, user.password);
      if (!passwordCheck) {
        return {
          ok: false,
          error: "비밀번호가 일치하지 않습니다.",
        };
      }

      const accessToken = await jwt.sign(
        { id: user.id },
        process.env.SERVER_KEY as string
      );

      const refreshToken = await jwt.sign(
        { id: user.id },
        process.env.COOKIES_KEY as string
      );

      const cookies = new Cookies(req, res, {
        keys: [process.env.COOKIES_KEY as string],
      });

      cookies.set("refreshToken", refreshToken, {
        signed: true,
        secureProxy: true,
        path: "/",
      });

      return {
        ok: true,
        accessToken,
      };
    },
  },
};
