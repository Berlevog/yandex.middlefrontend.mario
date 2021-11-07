import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

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
