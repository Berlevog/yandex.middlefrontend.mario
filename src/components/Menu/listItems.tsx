import React, { useCallback } from "react";
import { useHistory } from "react-router";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ForumIcon from "@material-ui/icons/Forum";

import { signout } from "../../services/auth";

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

  const signOut = useCallback(() => {
    signout().then(() => history.push("/login"));
  }, []);

  return (
    <div>
      <ListItem button onClick={signOut}>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
    </div>
  );
}
