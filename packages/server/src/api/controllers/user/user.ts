import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "../../models/User";

export const show = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.userId);
    res.status(StatusCodes.OK).json(user);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const createOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    let user = await User.findByPk(id);
    if (!user) {
      user = await User.create(req.body);
    } else {
      await user.update(req.body);
    }
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
