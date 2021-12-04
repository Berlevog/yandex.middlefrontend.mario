import axios from "axios";
import { NextFunction, Request, Response } from "express";

const AUTH_URL = "https://ya-praktikum.tech/api/v2/auth/user";

export async function authMiddleware(req: Request) {
  enum protectedRoutes {
    "/forum" = "forum",
    "/login" = "login",
  }

  //@ts-ignore
  const isProtectedRoute = protectedRoutes[req.url];

  if (isProtectedRoute) {
    try {
      // const cookie = `authCookie=${req.cookies.authCookie}`;

      console.log(req.cookies);

      // const { data } = await axios.get(AUTH_URL, {
      //   headers: { Cookie: cookie },
      // });

      // console.log(data);
    } catch (e) {
      //@ts-ignore
      console.log("redirect to /login", e, e.message);
    }
  }
}
