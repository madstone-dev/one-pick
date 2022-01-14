import jwt from "jsonwebtoken";
import { getUser } from "./schemas/users/users.utils";
import Cookies from "cookies";

export const validAcessToken = async ({ req, res, accessToken }: any) => {
  if (!accessToken) {
    return { req, res, auth: null };
  }

  try {
    const user = await getUser(accessToken);
    return { req, res, auth: user };
  } catch (error) {
    return validRefreshToken({ req, res });
  }
};

export const validRefreshToken = async ({ req, res }: any) => {
  const cookies = new Cookies(req, res, {
    keys: [process.env.COOKIES_KEY as string],
  });
  // 액세스토큰이 없을때, 리프레시 토큰이 없거나, 변조되었을시
  const refreshToken = await cookies.get("refreshToken", { signed: true });
  if (!refreshToken) {
    cookies.set("refreshToken", refreshToken, {
      maxAge: -1,
      secureProxy: true,
      path: "/",
    });
    throw Error("유효한 갱신 토큰이 아닙니다.");
  }
  try {
    jwt.verify(refreshToken, process.env.COOKIES_KEY as string);
  } catch (error) {
    cookies.set("refreshToken", refreshToken, {
      maxAge: -1,
      secureProxy: true,
      path: "/",
    });
    throw Error("유효한 갱신 토큰이 아닙니다.");
  }
  return { req, res, auth: null };
};
