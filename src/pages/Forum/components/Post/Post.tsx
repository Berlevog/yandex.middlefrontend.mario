import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { DEFAULT_AVATAR } from "../../../../config/constants";

import { PostProps } from "../types";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      padding: 16,
    },
    avatar: {
      marginBottom: 4,
    },
  })
);

const Post: FC<PostProps> = (post) => {
  const classes = useStyles();
  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={3}>
        <Avatar
          alt={post.user.name}
          src={post.user.avatar || DEFAULT_AVATAR}
          className={classes.avatar}
        />
        <Typography variant="body1">{post.user.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {post.date}
        </Typography>
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {post.content}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Post;
