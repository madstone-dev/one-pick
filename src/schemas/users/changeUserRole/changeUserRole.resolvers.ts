import client from "../../../client";
import { adminResolver } from "../../users/users.utils";

export default {
  Mutation: {
    changeUserRole: adminResolver(async (_, { id, role }) => {
      if (role !== "admin" && role !== "user") {
        return {
          ok: false,
          error: "올바른 권한이 아닙니다.",
        };
      }

      const user = await client.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) {
        return {
          ok: false,
          error: "사용자가 없습니다.",
        };
      }

      await client.user.update({
        where: {
          id,
        },
        data: {
          role,
        },
      });

      return {
        ok: true,
      };
    }),
  },
};
