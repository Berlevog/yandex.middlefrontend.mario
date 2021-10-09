import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TopPlayersList from "./TopPlayersList";

import { DefaultLayout } from "../../layouts";

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
