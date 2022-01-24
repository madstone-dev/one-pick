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
    updateUser: authResolver(
      async (_, { username, password, avatar, fileExists }, { auth }) => {
        if (username) {
          if (username.length < 2) {
            return {
              ok: false,
              error: "닉네임은 최소 2글자 이상이어야 합니다.",
            };
          }
          if (username.length > 30) {
            return {
              ok: false,
              error: "닉네임은 최대 30글자 이하이어야 합니다.",
            };
          }
          const exists = await client.user.findUnique({
            where: {
              username: username.trim(),
            },
            select: {
              id: true,
            },
          });
          if (exists) {
            return {
              ok: false,
              error: "이미 존재하는 닉네임 입니다.",
            };
          }
        }

        const removeOldImage = async () => {
          if (auth.avatar) {
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
        };

        let newAvatarData;
        if (avatar) {
          await removeOldImage();
          const extensions = ["jpg", "jpeg", "png"];
          if (!(await validateFileExtensions(extensions, avatar))) {
            return {
              ok: false,
              error: "jpg, png 형식의 이미지만 지원됩니다.",
            };
          }
          const { size } = await avatar;
          if (size > 5242880) {
            return {
              ok: false,
              error: "최대 5mb 까지만 가능합니다.",
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
        } else {
          if (!fileExists) {
            await removeOldImage();
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
            ...(username && {
              username: username.trim(),
            }),
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
      }
    ),
  },
};
