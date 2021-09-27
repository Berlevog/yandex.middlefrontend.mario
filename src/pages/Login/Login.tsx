import { Slide } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { SchemaOf } from "yup";

import { Footer } from "../../components/Footer";
import { UserSchema } from "../../constants/validationSchema";
import { getUser, signin, SigninProps } from "../../services/auth";

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
}));

export const signInSchema = UserSchema.pick(["login", "password"]) as SchemaOf<SigninProps>;

const initialValues: SigninProps = {
  login: "",
  password: "",
};

export default function Login() {
  const classes = useStyles();
  const history = useHistory();

  const gotoApp = () => {
    history.push("/app");
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signInSchema,
    onSubmit: (values) => {
      signin(values).then(gotoApp);
    },
  });

  useEffect(() => {
    getUser().then(gotoApp);
  }, []);

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
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label="Login"
                  name="login"
                  autoFocus
                  value={formik.values.login}
                  onChange={formik.handleChange}
                  error={formik.touched.login && Boolean(formik.errors.login)}
                  helperText={formik.touched.login && formik.errors.login}
                />
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

                <Button type="submit" color="primary" fullWidth variant="contained">
                  Sign In
                </Button>
              </form>
              <Grid container>
                <Grid item>
                  <Link href="/registration">{"Don't have an account? Sign Up"}</Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Footer />
        </Grid>
      </Slide>
    </Grid>
  );
}
