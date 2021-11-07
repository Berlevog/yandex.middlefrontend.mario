import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

import { DefaultLayout } from "../../layouts";
import TopPlayersList from "./TopPlayersList";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
}));

export default function Leaderboard() {
  const classes = useStyles();

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <TopPlayersList />
          </Paper>
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
