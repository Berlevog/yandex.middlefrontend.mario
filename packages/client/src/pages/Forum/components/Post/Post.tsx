import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createEmojiComment, destroyEmojiComment } from "../../../../store/emoji/emojiSlice";

import { DEFAULT_AVATAR } from "../../../../config/constants";
import { emojiesSelector } from "../../../../store/emoji/emojiSlice";
import { RESOURCES_URL } from "../../../../constants/url";

export type EmojiProps = { id: number; name: string };

export type EmojiCommentProps = {
  emojiId: number;
  commentId: number;
  userId: number;
};

export type PostProps = {
  threadId: number;
  id: number;
  userId: number;
  title: string;
  content: string;
  createdAt: Date;
  emojiComments?: EmojiCommentProps[];
  user: {
    name: string;
    avatar?: string;
  };
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      padding: 16,
    },
    avatar: {
      marginBottom: 4,
    },
    emojiButton: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
    },
    "emojiButton--exists": {
      border: "1px solid blue",
    },
    emojiOnPost: {
      marginRight: 6,
    },
  })
);

export default function Post(post: PostProps) {
  const classes = useStyles();

  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);

  const userId = user.id;

  const emojies: EmojiProps[] = useAppSelector(emojiesSelector);

  const emojiesOnPost = post.emojiComments?.reduce(
    (acc: { [key: string]: { [key: string]: number | string } }, { emojiId }) => {
      if (!acc[emojiId]) {
        const emoji = emojies.find((e) => e.id === emojiId);
        if (!emoji) {
          return acc;
        }
        acc[emojiId] = {
          count: 1,
          name: emoji.name,
        };
      } else {
        //@ts-ignore
        acc[emojiId].count++;
      }
      return acc;
    },
    {}
  );

  const emojiAlreadyExists = (emojiId: number) => {
    return post.emojiComments?.find((i) => i.emojiId === emojiId && i.userId === userId);
  };

  const handleEmojiClick = (emojiId: number) => {
    return () => {
      const alreadyExists = emojiAlreadyExists(emojiId);
      const data = {
        emojiId,
        userId,
        commentId: post.id,
      };
      if (alreadyExists) {
        dispatch(destroyEmojiComment(data));
      } else {
        dispatch(createEmojiComment(data));
      }
    };
  };

  return (
    <Grid container spacing={2} className={classes.root}>
      <Grid item xs={3}>
        <Avatar
          alt={post.user.name}
          src={`${RESOURCES_URL}${post.user.avatar}` || DEFAULT_AVATAR}
          className={classes.avatar}
        />
        <Typography variant="body1">{post.user.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(post.createdAt).toLocaleDateString("ru", {
            weekday: "short",
            year: "numeric",
            day: "numeric",
            month: "short",
            hour: "numeric",
            minute: "numeric",
          })}
        </Typography>
        {emojiesOnPost &&
          Object.values(emojiesOnPost).map((item) => {
            return <span className={classes.emojiOnPost}>{`${item.name}: ${item.count}`}</span>;
          })}
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="subtitle1">
              {post.content}
            </Typography>
            {emojies.map((emoji: EmojiProps) => (
              <button
                className={`${classes.emojiButton} ${emojiAlreadyExists(emoji.id) && classes["emojiButton--exists"]}`}
                onClick={handleEmojiClick(emoji.id)}
              >
                {emoji.name}
              </button>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
