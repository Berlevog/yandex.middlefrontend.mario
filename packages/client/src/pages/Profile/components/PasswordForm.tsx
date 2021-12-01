import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import { UserSchema } from "../../../constants/validationSchema";
import { SchemaOf } from "yup";
import { updatePassword, UpdatePasswordProps } from "../../../services/auth";
import Button from "@material-ui/core/Button";
import { AxiosError } from "axios";

const initialValues: UpdatePasswordProps & { password_confirm: string } = {
  password: "",
  password_confirm: "",
  oldPassword: "",
};

export const updatePasswordSchema = UserSchema.pick([
  "password",
  "password_confirm",
  "oldPassword",
]) as SchemaOf<UpdatePasswordProps>;

export type PasswordFormProps = {
  handleSuccess: () => void;
  handleError: (e: AxiosError) => void;
};

export default function PasswordForm({ handleSuccess, handleError }: PasswordFormProps) {
  const formik = useFormik({
    initialValues,
    validationSchema: updatePasswordSchema,
    onSubmit: ({ password, oldPassword }) => {
      updatePassword({
        oldPassword,
        newPassword: password,
      })
        .then(handleSuccess)
        .catch(handleError);
    },
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        Password
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="oldPassword"
          label="Old password"
          type="password"
          id="oldPassword"
          autoComplete="current-password"
          value={formik.values.oldPassword}
          onChange={formik.handleChange}
          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="New password"
          type="password"
          id="password"
          autoComplete="off"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password_confirm"
          label="Password Confirmation"
          type="password"
          id="password_confirm"
          autoComplete="off"
          value={formik.values.password_confirm}
          onChange={formik.handleChange}
          error={formik.touched.password_confirm && Boolean(formik.errors.password_confirm)}
          helperText={formik.touched.password_confirm && formik.errors.password_confirm}
        />

        <Button color="primary" variant="contained" fullWidth type="submit">
          Change
        </Button>
      </form>
    </>
  );
}
