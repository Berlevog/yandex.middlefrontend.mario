import React, { FC, useCallback, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Post } from "../Post";
import { getPostsByThreadId } from "../../mockData";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { CreatePost } from "../CreatePost";

type Props = {
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

const fetchPosts = (threadId: number) => {
  return getPostsByThreadId(threadId);
};

const PostList: FC<Props> = ({ threadId }) => {
  const classes = useStyles();
  const posts = fetchPosts(threadId);

  return (
    <Grid container>
      <Grid item md={12} className={classes.postList}>
        {posts.map((post, index) => (
          <div key={`${threadId}-post-${index}`}>
            <Post {...post} />
            <Divider />
          </div>
        ))}
      </Grid>
      <Grid item md={12}>
        <CreatePost />
      </Grid>
    </Grid>
  );
};

export default PostList;
