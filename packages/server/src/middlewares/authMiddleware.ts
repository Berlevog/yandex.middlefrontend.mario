import axios from "axios";
import { NextFunction, Request, Response } from "express";

const YANDEX_AUTH_URL = "https://ya-praktikum.tech/api/v2/auth/user";

const cookieToString = (cookies: Record<string, string>): string => {
  let res = "";

  if (cookies) {
    Object.entries<string>(cookies).forEach(([key, value], ind) => {
      res += `${ind === 0 ? "" : " "}${key}=${value};`;
    });
  }

  return res;
};

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  enum protectedRoutes {
    "/forum" = 1,
    "/profile" = 1,
    "/leaderboard" = 1,
  }

  const cookies = req.cookies;

  //@ts-ignore
  const isProtectedRoute = !!protectedRoutes[req.url];

  if (isProtectedRoute) {
    try {
      const { data: user } = await axios.get(YANDEX_AUTH_URL, {
        headers: { Cookie: cookieToString(cookies) },
      });

      res.locals.user = user;

      return next();
    } catch (e) {
      //@ts-ignore
      console.log("AUTH Middleware: ", e.message);
      req.url = "/login";
      res.redirect("/login");
      return;
    }
  }

  next();
}
