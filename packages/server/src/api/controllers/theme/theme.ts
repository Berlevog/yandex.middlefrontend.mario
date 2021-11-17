import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Theme } from "../../models/Theme";
import { User } from "../../models/User";

export const index = async (req: Request, res: Response) => {
  try {
    const themes = await Theme.findAll();
    res.status(StatusCodes.OK).json(themes);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const show = async (req: Request, res: Response) => {
  try {
    const theme = await Theme.findByPk(req.params.themeName);
    res.status(StatusCodes.OK).json(theme);
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(e);
  }
};

export const setThemeToUser = async (req: Request, res: Response) => {
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
