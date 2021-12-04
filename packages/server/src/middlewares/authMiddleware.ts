import axios from "axios";
import { NextFunction, Request, Response } from "express";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  enum protectedRoutes {
    "/forum",
    "/profile",
  }

  console.log("hello auth middleware: ", req.url);

  try {
    // Получить пользователя
    // Положить пользователя в стор
    console.log("authMiddleware: fetch user and fill the store");
  } catch (e) {
    // Проверить req.url на protectedRoute
    // Редиректнуть на /login если роут защищённый
    console.log("authMiddleware: not logged in");
  }

  await next();
}
