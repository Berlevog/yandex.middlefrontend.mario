import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import clsx from "clsx";
import React, { FC } from "react";
import { DRAWER_WIDTH } from "../../config/constants";
import { mainListItems, secondaryListItems } from "./listItems";

const useStyles = makeStyles((theme) => ({
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
}));

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  open: boolean;
};

const Menu: FC<Props> = ({ open, onClick }) => {
  const classes = useStyles();

  const mainList = mainListItems;
  const secondaryList = secondaryListItems();

  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={onClick}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>{mainList}</List>
      <Divider />
      <List>{secondaryList}</List>
    </Drawer>
  );
};

export default Menu;
