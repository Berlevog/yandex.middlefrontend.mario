import React, { FC, MouseEventHandler, useCallback, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Post } from "../Post";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { CreatePost } from "../CreatePost";

import { PostProps } from "../Post/Post";

type PostListProps = {
  posts?: PostProps[];
  threadId: number;
};

const useStyles = makeStyles(() =>
  createStyles({
    postList: {
      padding: 16,
      paddingLeft: 80,
    },
  })
);

export default function PostList({ posts, threadId }: PostListProps) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item md={12} className={classes.postList}>
        {posts &&
          posts.map((post, index) => (
            <div key={`${threadId}-post-${index}`}>
              <Post {...post} />
              <Divider />
            </div>
          ))}
      </Grid>
      <Grid item md={12}>
        <CreatePost threadId={threadId} />
      </Grid>
    </Grid>
  );
}
