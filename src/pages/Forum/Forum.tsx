import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { Thread } from "./components/Thread";
import { DefaultLayout } from "../../layouts";
import { CreateThread } from "./components/CreateThread";
import Typography from "@material-ui/core/Typography";

import { threads } from "./mockData";

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      marginTop: 24,
      marginBottom: 24,
    },
  })
);

const Forum: FC = () => {
  const classes = useStyles();

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
};

export default Forum;
