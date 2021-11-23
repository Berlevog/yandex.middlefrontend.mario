import { Request, Response } from "express";
import { EmojiComment } from "../../models/EmojiComment";
import { Emoji } from "../../models/Emoji";
import { StatusCodes } from "http-status-codes";
import validation from "./validation";

export const index = async (req: Request, res: Response) => {
  try {
    const emojies = await Emoji.findAll();
    res.status(StatusCodes.OK).json(emojies);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const createEmojiComment = [
  ...validation,
  async (req: Request, res: Response) => {
    try {
      const { emojiId, commentId, userId } = req.body;
      const emojiComment = await EmojiComment.findOne({
        where: { emojiId, commentId, userId },
      });
      if (emojiComment) {
        res.sendStatus(StatusCodes.FORBIDDEN);
      }

      await EmojiComment.create<EmojiComment>(req.body);
      res.sendStatus(StatusCodes.OK);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  },
];

export const destroyEmojiComment = [
  ...validation,
  async (req: Request, res: Response) => {
    try {
      const { emojiId, commentId, userId } = req.body;

      await EmojiComment.destroy<EmojiComment>({
        where: {
          emojiId,
          commentId,
          userId,
        },
      });
      res.sendStatus(StatusCodes.OK);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  },
];
