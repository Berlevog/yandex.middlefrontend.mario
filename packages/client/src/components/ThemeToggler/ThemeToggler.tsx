import React, { FC } from "react";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Switch from "@material-ui/core/Switch";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { currentThemeNameSelector, DARK_THEME, DEFAULT_THEME, toggleTheme } from "../../store/theme/themeSlice";
import { updateUser } from "../../services/appAuth";
import { isLoggedInSelector, userSelector } from "../../store/slices/authSlice";

const ThemeToggler = () => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);

  const isLoggedIn = useAppSelector(isLoggedInSelector);

  const currentThemeName = useAppSelector(currentThemeNameSelector);

  const handleClick = async () => {
    if (isLoggedIn) {
      await updateUser({
        id: user.id,
        themeName: currentThemeName === DARK_THEME ? DEFAULT_THEME : DARK_THEME,
      });
    }
    dispatch(toggleTheme());
  };

  return (
    <Switch
      color="default"
      onClick={handleClick}
      checked={currentThemeName === DARK_THEME}
      icon={<WbSunnyOutlinedIcon />}
      checkedIcon={<Brightness2Icon />}
    />
  );
};

export default ThemeToggler;
