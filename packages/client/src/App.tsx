/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { createTheme, ThemeProvider } from "@material-ui/core";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Forum, Leaderboard, Login, Profile, Registration } from "./pages";
import { StylesProvider, createGenerateClassName } from "@material-ui/core/styles";

import { GamePages } from "./pages/Game";
import { AuthWrapper } from "./components/AuthWrapper/AuthWrapper";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { currentThemeSelector, getThemes } from "./store/theme/themeSlice";

const generateClassName = createGenerateClassName({
  disableGlobal: true,
});

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getThemes());
  }, []);
  const currentTheme = useAppSelector(currentThemeSelector);
  const theme = createTheme(currentTheme?.theme);

  return (
    <div className="App" suppressHydrationWarning={true}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Redirect exact from="/" to="/app" />
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <Route exact path="/app" component={GamePages} />
            <AuthWrapper>
              <Route exact path="/leaderboard" component={Leaderboard} />
              <Route exact path="/forum" component={Forum} />
              <Route exact path="/profile" component={Profile} />
            </AuthWrapper>
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
