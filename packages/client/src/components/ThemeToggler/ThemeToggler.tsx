import Switch from "@material-ui/core/Switch";
import Brightness2Icon from "@material-ui/icons/Brightness2";
import WbSunnyOutlinedIcon from "@material-ui/icons/WbSunnyOutlined";
import React from "react";

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
