import { Router } from "express";
import * as emojiController from "../../controllers/emoji";

export const emojies = Router();

emojies.get("/", emojiController.index);

emojies.post("/:emojiId/comment/:commentId", emojiController.createEmojiComment);

emojies.delete("/:emojiId/comment/:commentId", emojiController.destroyEmojiComment);
