import { Router } from "express";
import * as commentController from "../../controllers/comment";

export const comments = Router();

comments.post("/", commentController.store);

comments.delete("/:id", commentController.destroy);
