import client from "../../../client";
import { forgotPasswordMail } from "../../../mails/forgotPasswordMail";
import { sendMail } from "../users.utils";

interface IforgotPassword {
  email: string;
}

export default {
  Mutation: {
    forgotPassword: async (_: any, { email }: IforgotPassword) => {
      const user = await client.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "이메일이 존재하지 않습니다.",
        };
      }

      const html = await forgotPasswordMail(user.id, email);

      sendMail({
        to: email,
        subject: "비밀번호 재설정 링크가 도착했습니다.",
        html,
      });
      return {
        ok: true,
      };
    },
  },
};
