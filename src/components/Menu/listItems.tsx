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

import { DEFAULT_AVATAR } from "../../config/constants";
import useAuth from "../../utils/useAuth";

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/app">
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Game" />
    </ListItem>
    <ListItem button component="a" href="/leaderboard">
      <ListItemIcon>
        <ShowChartIcon />
      </ListItemIcon>
      <ListItemText primary="Leaderboard" />
    </ListItem>
    <ListItem button component="a" href="/forum">
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Forum" />
    </ListItem>
  </div>
);

export function secondaryListItems() {
  const history = useHistory();

  const auth = useAuth();

  const signOut = useCallback(() => {
    auth.logout();
    history.push("/login");
  }, []);

  let avatar;
  return (
    <div>
      <ListItem button component="a" href="/profile">
        <ListItemIcon>
          <Avatar alt="userName" src={avatar || DEFAULT_AVATAR} />
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
