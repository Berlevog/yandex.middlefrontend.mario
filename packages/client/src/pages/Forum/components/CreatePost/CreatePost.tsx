import React, { FormEvent, useState } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createComment } from "../../../../store/thread/threadSlice";

type CreatePostProps = {
  threadId: number;
};

const useStyles = makeStyles(() =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "row",
      padding: 8,
    },
    textField: {
      flexGrow: 1,
      marginRight: 16,
    },
  })
);
export default function CreatePost({ threadId }: CreatePostProps) {
  const classes = useStyles();
  let [content, setContent] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    dispatch(createComment({ content, userId: user.id, threadId }));
    setContent("");
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        label="Ваш комментарий"
        className={classes.textField}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Button variant="outlined" type="submit">
        Ответить
      </Button>
    </form>
  );
}
