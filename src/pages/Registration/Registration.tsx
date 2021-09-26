import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Slide } from "@material-ui/core";
import { useFormik } from "formik";
import { SchemaOf } from "yup";
import InputMask from "react-input-mask";

import { UserSchema } from "../../constants/validationSchema";
import { getUser, signup, SignupProps } from "../../services/auth";
import { useHistory } from "react-router";

function Copyright(props: any) {
  return (
    <Typography variant="body2" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Berlevog">
        Berlevog Team
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
    background: theme.loginPage.background,
    backdropFilter: theme.loginPage.backdropFilter,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
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

  const formik = useFormik({
    initialValues,
    validationSchema: signUpSchema,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
      alert(JSON.stringify(values, null, 2));
      signup(values)
        .then((data) => console.log("response", data))
        .then(() => getUser())
        .then((data) => {
          console.log("user", data);
          history.push("/app");
        });
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

                <Button color="primary" variant="contained" fullWidth type="submit">
                  Sign Up
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Link href="/login">{"Have an account? Sign In"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Grid>
      </Slide>
    </Grid>
  );
}
