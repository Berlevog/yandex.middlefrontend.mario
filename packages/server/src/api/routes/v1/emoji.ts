import { Router } from "express";
import * as emojiController from "../../controllers/emoji";

export const emojies = Router();

emojies.get("/", emojiController.index);

emojies.post("/", emojiController.createEmojiComment);

emojies.delete("/", emojiController.destroyEmojiComment);
