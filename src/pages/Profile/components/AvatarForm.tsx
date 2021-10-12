import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { UpdateAvatarProps } from "../../../services/auth";
import Button from "@material-ui/core/Button";

const initialValues: UpdateAvatarProps = {};

export default function AvatarForm() {
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Avatar
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="avatar"
          label="Avatar"
          type="file"
          id="avatar"
          autoComplete="off"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          error={formik.touched.avatar && Boolean(formik.errors.avatar)}
          helperText={formik.touched.avatar && formik.errors.avatar}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Upload
        </Button>
      </form>
    </>
  );
}
