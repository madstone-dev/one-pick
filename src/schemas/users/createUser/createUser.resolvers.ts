import bcrypt from "bcrypt";
import client from "../../../client";
import * as yup from "yup";
import { setLocale } from "yup";

interface IcreateUserForm {
  email: string;
  username: string;
  password: string;
}

export default {
  Mutation: {
    createUser: async (
      _: any,
      { email, username, password }: IcreateUserForm
    ) => {
      setLocale({
        string: {
          email: ({ path, value }) => ({
            key: "email",
            values: { path, value },
          }),
          min: ({ path, min }) => ({ key: "min", values: { path, min } }),
        },
      });

      const yupSchema = yup.object().shape({
        email: yup.string().email().required(),
        username: yup.string().min(2).required(),
        password: yup.string().min(8).required(),
      });

      const validateResult = await yupSchema
        .validate({
          email,
          username,
          password,
        })
        .catch((err) => {
          let message = "올바르지 않은 양식입니다.";
          if (err.errors[0].key === "email") {
            message = "올바른 이메일 양식이 아닙니다.";
          }
          if (err.errors[0].key === "min") {
            if (err.errors[0].values.path === "username") {
              message = `닉네임은 최소 ${err.errors[0].values.min} 글자 이상이어야 합니다.`;
            }
            if (err.errors[0].values.path === "password") {
              message = `비밀번호는 최소 ${err.errors[0].values.min} 자리여야 입니다.`;
            }
          }
          return {
            ok: false,
            error: message,
          };
        });

      if (validateResult.error) {
        return validateResult;
      }

      const emailExists = await client.user.findUnique({
        where: {
          email,
        },
      });

      if (emailExists) {
        return {
          ok: false,
          error: "이미 존재하는 이메일 입니다.",
        };
      }

      const usernameExists = await client.user.findUnique({
        where: {
          username,
        },
      });

      if (usernameExists) {
        return {
          ok: false,
          error: "이미 존재하는 닉네임 입니다.",
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await client.user.create({
        data: {
          email,
          username,
          password: hashedPassword,
        },
      });

      return {
        ok: true,
      };
    },
  },
};
