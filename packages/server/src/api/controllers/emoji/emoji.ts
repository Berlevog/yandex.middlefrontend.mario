import { Request, Response } from "express";
import { EmojiComment } from "../../models/EmojiComment";
import { Emoji } from "../../models/Emoji";
import { StatusCodes } from "http-status-codes";

export const index = async (req: Request, res: Response) => {
  try {
    const emojies = await Emoji.findAll();
    res.status(StatusCodes.OK).json(emojies);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const createEmojiComment = async (req: Request, res: Response) => {
  try {
    await EmojiComment.create<EmojiComment>({
      // @ts-ignore
      emojiId: req.params.emojiId,
      // @ts-ignore
      commentId: req.params.commentId,
    });
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const destroyEmojiComment = async (req: Request, res: Response) => {
  try {
    await EmojiComment.destroy<EmojiComment>({
      where: {
        emojiId: req.params.emojiId,
        commentId: req.params.commentId,
      },
    });
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
