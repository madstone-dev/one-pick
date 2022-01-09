import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../../client";

export default {
  Mutation: {
    resetPassword: async (_: any, { email, token, password }: any) => {
      if (password) {
        if (password.length < 8) {
          return {
            ok: false,
            error: "비밀번호는 최소 8 자리여야 합니다.",
          };
        }
      } else {
        return {
          ok: false,
          error: "비밀번호는 필수 항목입니다.",
        };
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      let verifiedToken: any;

      try {
        verifiedToken = await jwt.verify(
          token,
          process.env.SERVER_KEY as string
        );
      } catch (error) {
        return {
          ok: false,
          error: "만료된 링크입니다.",
        };
      }

      if ("id" in verifiedToken) {
        const user = await client.user.findFirst({
          where: {
            id: verifiedToken["id"],
            email,
          },
        });
        if (user) {
          await client.user.update({
            where: {
              id: verifiedToken["id"],
            },
            data: {
              password: hashedPassword,
            },
          });

          return {
            ok: true,
          };
        }
      }

      return {
        ok: false,
        error: "이메일이 존재하지 않습니다.",
      };
    },
  },
};
