import { Slide } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import { useHistory } from "react-router";
import { SchemaOf } from "yup";
import { Footer } from "../../components/Footer";
import { Alert } from "../../components/Alert";

import { UserSchema } from "../../constants/validationSchema";
import { SignupProps } from "../../services/auth";
import { AxiosError } from "axios";
import { UNKNOWN_ERROR } from "../../config/constants";
// import useAuth from "../../utils/useAuth";

const useStyles = makeStyles((theme) => ({
  main: {
    height: "100vh",
    backgroundImage: "url(/assets/mario-background.jpeg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "left",
    animationName: "from-left-to-right",
    animationDuration: "4s",
  },

  formContainer: {
    background: theme.loginPage?.background,
    backdropFilter: theme.loginPage?.backdropFilter,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  register: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const signUpSchema = UserSchema.pick([
  "email",
  "login",
  "first_name",
  "second_name",
  "phone",
  "password",
  "password_confirm",
]) as SchemaOf<SignupProps>;

const initialValues: SignupProps = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  phone: "",
  password: "",
  password_confirm: "",
};

export default function Registration() {
  const classes = useStyles();
  const history = useHistory();

  // const auth = useAuth();

  const gotoApp = () => {
    history.push("/app");
  };

  const [error, setError] = useState("");

  const handleError = (e: AxiosError) => {
    const error = e?.response?.data?.reason;
    setError(error || UNKNOWN_ERROR);
  };

  const handleCloseAlert = () => setError("");

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      // auth.register(values).then(gotoApp).catch(handleError);
    },
  });

  return (
    <Grid container component="main" className={classes.main}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} />
      <Slide direction="right" in={true}>
        <Grid item xs={12} sm={8} md={5} className={classes.formContainer}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>

            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
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
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
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
                  autoComplete="current-password"
                  value={formik.values.password_confirm}
                  onChange={formik.handleChange}
                  error={formik.touched.password_confirm && Boolean(formik.errors.password_confirm)}
                  helperText={formik.touched.password_confirm && formik.errors.password_confirm}
                />

                <Button color="primary" variant="contained" fullWidth type="submit" className={classes.register}>
                  Sign Up
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Link to="/login">{"Have an account? Sign In"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer />
        </Grid>
      </Slide>
      {!!error && <Alert message={error} severity="error" onClose={handleCloseAlert} />}
    </Grid>
  );
}
