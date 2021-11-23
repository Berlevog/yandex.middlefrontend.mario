import { Router } from "express";
import * as userController from "../../controllers/user";
export const users = Router();

users.post("/", userController.createOrUpdateUser);

users.get("/:userId", userController.show);
