import React, { FC } from "react";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import Switch from "@material-ui/core/Switch";

const ThemeToggler = () => {
  return (
    <>
      <WbSunnyOutlinedIcon />
      <Switch color="default" />
      <Brightness2Icon />
    </>
  );
};

export default ThemeToggler;
