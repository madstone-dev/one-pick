import client from "../../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface IloginForm {
  email: string;
  password: string;
}

export default {
  Mutation: {
    login: async (_: any, { email, password }: IloginForm) => {
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
        process.env.ACCESS_TOKEN_KEY as string
      );

      return {
        ok: true,
        accessToken,
      };
    },
  },
};
