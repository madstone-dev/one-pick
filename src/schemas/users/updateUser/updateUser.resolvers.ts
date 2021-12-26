import {
  deleteSingleFromS3,
  uploadToS3,
  validateFileExtensions,
} from "../../_shared/_shared.utils";
import { authResolver } from "../users.utils";
import bcrypt from "bcrypt";
import client from "../../../client";

export default {
  Mutation: {
    updateUser: authResolver(async (_, { password, avatar }, { auth }) => {
      if (avatar && auth.avatar) {
        const { Bucket, Key } = JSON.parse(auth.avatar);
        const deleteResult = await deleteSingleFromS3(Bucket, Key);
        if (deleteResult.error) {
          return {
            ok: false,
            error: deleteResult.error,
          };
        }
        await client.user.update({
          where: {
            id: auth.id,
          },
          data: {
            avatar: null,
          },
        });
      }

      let newAvatarData;
      if (avatar) {
        const extensions = ["jpg", "jpeg", "png"];
        if (!(await validateFileExtensions(extensions, avatar))) {
          return {
            ok: false,
            error: "jpg, png 형식의 이미지만 지원됩니다.",
          };
        }
        const uploadResult = await uploadToS3(avatar, auth.id, "avatars");
        if (uploadResult.error) {
          return {
            ok: false,
            error: uploadResult.error,
          };
        } else {
          newAvatarData = JSON.stringify(uploadResult.data);
        }
      }

      let hashedPassword;
      if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
      }

      const updatedUser = await client.user.update({
        where: {
          id: auth.id,
        },
        data: {
          password: hashedPassword,
          avatar: newAvatarData,
        },
      });

      if (updatedUser) {
        return {
          ok: true,
          user: updatedUser,
        };
      } else {
        return {
          ok: false,
          error: "문제가 발생했습니다. 계정을 업데이트 할 수 없습니다.",
        };
      }
    }),
  },
};
