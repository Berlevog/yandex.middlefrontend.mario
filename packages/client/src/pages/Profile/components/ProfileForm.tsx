import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { AxiosError } from "axios";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import InputMask from "react-input-mask";
import { SchemaOf } from "yup";
import { UserSchema } from "../../../constants/validationSchema";
import { updateUser, UpdateUserProps, User } from "../../../services/auth";

export const updateUserSchema = UserSchema.omit([
  "avatar",
  "password",
  "password_confirm",
  "oldPassword",
]) as SchemaOf<UpdateUserProps>;

export type ProfileFormProps = {
  handleSuccess: () => void;
  handleError: (e: AxiosError) => void;
  user: User;
};

export default function ProfileForm({ handleSuccess, handleError, user }: ProfileFormProps) {
  const formik = useFormik({
    initialValues: user,
    validationSchema: updateUserSchema,
    onSubmit: (values) => {
      updateUser(values).then(handleSuccess).catch(handleError);
    },
    enableReinitialize: true,
  });

  return (
    <>
      <Typography component="h1" variant="h5">
        User
      </Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="display_name"
            label="Display name"
            name="display_name"
            autoComplete="off"
            value={formik.values.display_name}
            onChange={formik.handleChange}
            error={formik.touched.display_name && Boolean(formik.errors.display_name)}
            helperText={formik.touched.display_name && formik.errors.display_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="login"
            label="Login"
            name="login"
            autoComplete="off"
            value={formik.values.login}
            onChange={formik.handleChange}
            error={formik.touched.login && Boolean(formik.errors.login)}
            helperText={formik.touched.login && formik.errors.login}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="first_name"
            label="First Name"
            name="first_name"
            autoComplete="off"
            value={formik.values.first_name}
            onChange={formik.handleChange}
            error={formik.touched.first_name && Boolean(formik.errors.first_name)}
            helperText={formik.touched.first_name && formik.errors.first_name}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="second_name"
            label="Second Name"
            name="second_name"
            autoComplete="off"
            value={formik.values.second_name}
            onChange={formik.handleChange}
            error={formik.touched.second_name && Boolean(formik.errors.second_name)}
            helperText={formik.touched.second_name && formik.errors.second_name}
          />
          <InputMask
            mask="+7 (999) 999-99-99"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {() => (
              <TextField
                type="tel"
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Phone"
                name="phone"
                autoComplete="phone"
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
              />
            )}
          </InputMask>

          <Button color="primary" variant="contained" fullWidth type="submit">
            Update
          </Button>
        </form>
      </FormikProvider>
    </>
  );
}
