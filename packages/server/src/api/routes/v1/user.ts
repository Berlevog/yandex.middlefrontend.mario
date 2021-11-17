import { Router } from "express";
import * as userController from "../../controllers/user";
export const users = Router();

users.get("/:userId", userController.show);

users.post("/:userId/theme/:themeName", userController.setTheme);
