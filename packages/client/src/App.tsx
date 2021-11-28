/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { createTheme, ThemeProvider } from "@material-ui/core";
import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Forum, Leaderboard, Login, Profile, Registration } from "./pages";

import { GamePages } from "./pages/Game";
import { AuthWrapper } from "./components/AuthWrapper/AuthWrapper";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { currentThemeSelector, getThemes } from "./store/theme/themeSlice";
import { getUser } from "./store/thunks/auth";
import { isLoggedInSelector } from "store/slices/authSlice";

const generateClassName = createGenerateClassName({
  disableGlobal: true,
});

function App() {
  const dispatch = useAppDispatch();
  if (typeof window !== "undefined") {
    const search = new URLSearchParams(document.location.search);
    const code = search.get("code")!;

    useEffect(() => {
      dispatch(getUser(code));
      dispatch(getThemes());
    }, [code]);
  }
  const currentTheme = useAppSelector(currentThemeSelector);
  const theme = createTheme(currentTheme?.theme);

  return (
    <div className="App" suppressHydrationWarning={true}>
      <StylesProvider generateClassName={generateClassName}>
        <ThemeProvider theme={theme}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/registration" component={Registration} />
            <AuthWrapper>
              <Switch>
                <Redirect exact from="/" to="/app" />
                <Route exact path="/app" component={GamePages} />
                <Route exact path="/leaderboard" component={Leaderboard} />
                <Route exact path="/forum" component={Forum} />
                <Route exact path="/profile" component={Profile} />
              </Switch>
            </AuthWrapper>
          </Switch>
        </ThemeProvider>
      </StylesProvider>
    </div>
  );
}

export default App;
