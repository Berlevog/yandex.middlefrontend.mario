import React, { useState, FormEvent } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createThread, getThreads } from "../../../../store/thread/threadSlice";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      padding: 16,
    },
  })
);
export default function CreateThread() {
  const classes = useStyles();

  let [title, setTitle] = useState("");
  let [content, setContent] = useState("");
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(createThread({ title, content, userId: user.id }));
    dispatch(getThreads());
    setTitle("");
    setContent("");
  };
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Новая тема
      </Typography>
      <Divider />
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          required
          margin="normal"
          label="Название"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label="Содержание"
          multiline
          rows={5}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Создать
        </Button>
      </form>
    </Paper>
  );
}
