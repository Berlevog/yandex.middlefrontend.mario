import { Router } from "express";
import * as themeController from "../../controllers/theme";
export const themes = Router();

themes.get("/", themeController.index);

themes.get("/:themeName", themeController.show);
