import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import ForumIcon from "@material-ui/icons/Forum";

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SportsEsportsIcon />
      </ListItemIcon>
      <ListItemText primary="Game" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ShowChartIcon />
      </ListItemIcon>
      <ListItemText primary="Leaderboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ForumIcon />
      </ListItemIcon>
      <ListItemText primary="Forum" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <ExitToAppIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
