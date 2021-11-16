import React, { FC } from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      width: "100%",
      padding: 16,
    },
  })
);
const CreateThread: FC = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <Typography variant="h5" component="h3" gutterBottom>
        Новая тема
      </Typography>
      <Divider />
      <form>
        <TextField
          fullWidth
          variant="outlined"
          required
          margin="normal"
          label="Название"
        />
        <TextField
          variant="outlined"
          required
          margin="normal"
          fullWidth
          label="Содержание"
          multiline
          rows={5}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Создать
        </Button>
      </form>
    </Paper>
  );
};

export default CreateThread;
