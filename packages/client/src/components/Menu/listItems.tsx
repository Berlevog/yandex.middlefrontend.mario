import React, { useCallback } from "react";
import { useHistory } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ForumIcon from "@material-ui/icons/Forum";
import Avatar from "@material-ui/core/Avatar";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { DEFAULT_AVATAR } from "../../config/constants";
import { makeStyles } from "@material-ui/core/styles";

import useAuth from "../../utils/useAuth";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { RESOURCES_URL } from "../../constants/url";

export const mainListItems = (
  <div>
    <ListItem button component={Link} to="/app">
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Game" />
    </ListItem>
  </div>
);

const useStyles = makeStyles(() => ({
  avatar: {
    width: 24,
    height: 24,
  },
}));

export function secondaryListItems() {
  const history = useHistory();

  const auth = useAuth();

  const signOut = useCallback(() => {
    auth.logout();
    history.push("/login");
  }, []);

  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  if (!user || !user.login) {
    return (
      <ListItem button component={Link} to="/login">
        <ListItemIcon>
          <LockOpenIcon />
        </ListItemIcon>
        <ListItemText primary="Login" />
      </ListItem>
    );
  }

  return (
    <div>
      <ListItem button component={Link} to="/leaderboard">
        <ListItemIcon>
          <ShowChartIcon />
        </ListItemIcon>
        <ListItemText primary="Leaderboard" />
      </ListItem>
      <ListItem button component={Link} to="/forum">
        <ListItemIcon>
          <ForumIcon />
        </ListItemIcon>
        <ListItemText primary="Forum" />
      </ListItem>
      <ListItem button component={Link} to="/profile">
        <ListItemIcon>
          <Avatar alt="userName" src={`${RESOURCES_URL}${user.avatar}` || DEFAULT_AVATAR} className={classes.avatar} />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
      <ListItem button onClick={signOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
}
