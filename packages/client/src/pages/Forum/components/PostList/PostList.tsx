import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import { getPostsByThreadId } from "../../mockData";
import { CreatePost } from "../CreatePost";
import { Post } from "../Post";

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
