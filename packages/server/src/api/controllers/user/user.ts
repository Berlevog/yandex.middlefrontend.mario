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

export const setTheme = async (req: Request, res: Response) => {
  try {
    const apiUserId = req.params.userId;
    let user = await User.findByPk(apiUserId);
    if (!user) {
      user = await User.create({
        // @ts-ignore
        apiUserId,
        themeName: req.params.themeName,
      });
    } else {
      await user.update({
        themeName: req.params.themeName,
      });
    }
    res.sendStatus(StatusCodes.OK);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};
