/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { createTheme, ThemeProvider } from "@material-ui/core";
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch, Redirect } from "react-router-dom";
import { Forum, Leaderboard, Login, Profile, Registration } from "./pages";

import { GamePages } from "./pages/Game";

declare module "@material-ui/core/styles" {
  interface Theme {
    loginPage: {
      background: string;
      backdropFilter: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    loginPage?: {
      background: string;
      backdropFilter: string;
    };
  }
}

const history = createBrowserHistory();

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  loginPage: {
    background: "#00000033",
    backdropFilter: "blur(10px)",
  },
});

const lightTheme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  loginPage: {
    background: "#FFFFFF88",
    backdropFilter: "blur(3px)",
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={lightTheme}>
        <Router history={history}>
          <Switch>
            <Route exact path="/">
              <Redirect to="/app" />
            </Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/app" component={GamePages} />
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/forum" component={Forum} />
            <Route exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
