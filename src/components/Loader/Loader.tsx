import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

export default function Loader() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
}
