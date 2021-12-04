import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import { PostList } from "../PostList";

import { DEFAULT_AVATAR } from "../../../../config/constants";
import { RESOURCES_URL } from "../../../../constants/url";
import { PostProps } from "../Post/Post";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      marginBottom: 8,
    },
    avatar: {
      marginBottom: 8,
    },
  })
);

export type ThreadProps = {
  id: number;
  userId: number;
  title: string;
  content: string;
  comment?: [];
  createdAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
};

export default function Thread(thread: ThreadProps) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1c-content" id="panel1c-header">
          <Grid container spacing={2} className={classes.root}>
            <Grid item xs={3}>
              <Avatar
                alt={thread.user.name}
                src={`${RESOURCES_URL}${thread.user.avatar}` || DEFAULT_AVATAR}
                className={classes.avatar}
              />
              <Typography variant="body1">{thread.user.name}</Typography>
              <Typography variant="body2" color="textSecondary">
                {new Date(thread.createdAt).toLocaleDateString("ru", {
                  weekday: "long",
                  year: "numeric",
                  day: "numeric",
                  month: "short",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography gutterBottom variant="h5" color="textSecondary" component="h3">
                {thread.title}
              </Typography>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body1" component="p">
            {thread.content}
          </Typography>
        </AccordionDetails>
        <Divider />
        <PostList posts={thread?.comment} threadId={thread.id} />
      </Accordion>
    </div>
  );
}
