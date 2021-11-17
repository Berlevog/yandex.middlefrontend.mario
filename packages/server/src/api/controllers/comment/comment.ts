import { Comment } from "../../models/Comment";
import { Request, Response } from "express";
import validation from "./validation";
import { StatusCodes } from "http-status-codes";

export const store = [
  ...validation,
  async (req: Request, res: Response) => {
    try {
      const comment = await Comment.create(req.body);
      res.status(StatusCodes.CREATED).json(comment);
    } catch (e) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
    }
  },
];

export const destroy = async (req: Request, res: Response) => {
  try {
    await Comment.destroy<Comment>({
      where: {
        id: req.params.id,
      },
    });
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
