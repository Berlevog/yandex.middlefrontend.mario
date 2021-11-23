import React, { useEffect, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Thread } from "./components/Thread";
import { DefaultLayout } from "../../layouts";
import { CreateThread } from "./components/CreateThread";
import Typography from "@material-ui/core/Typography";

import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { allThreadsSelector, getThreads } from "../../store/thread/threadSlice";
import { useSelector } from "react-redux";
import { getEmojies } from "../../store/emoji/emojiSlice";
import { ThreadProps } from "./components/Thread/Thread";

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      marginTop: 24,
      marginBottom: 24,
    },
  })
);

export default function Forum() {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getThreads());
    dispatch(getEmojies());
  }, []);

  const threads: ThreadProps[] = useSelector(allThreadsSelector);

  return (
    <DefaultLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h3" component="h1" gutterBottom>
            Форум
          </Typography>
          {threads.map((thread) => (
            <Thread key={thread.id} {...thread} />
          ))}
          <Divider className={classes.divider} />
          <CreateThread />
        </Grid>
      </Grid>
    </DefaultLayout>
  );
}
