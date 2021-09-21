import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

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
const CreatePost: FC = () => {
  const classes = useStyles();
  return (
    <form className={classes.form}>
      <TextField
        variant="outlined"
        label="Ваш комментарий"
        className={classes.textField}
      />
      <Button variant="outlined" color="primary">
        Ответить
      </Button>
    </form>
  );
};

export default CreatePost;
