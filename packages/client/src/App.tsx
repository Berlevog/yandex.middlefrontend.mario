/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { createTheme, ThemeProvider } from "@material-ui/core";
import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Forum, Leaderboard, Login, Profile, Registration } from "./pages";

import { GamePages } from "./pages/Game";
import { useAppDispatch } from "./store/hooks";
import { getUser } from "./store/thunks/auth";

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

const darkTheme = createTheme({
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			"\"Segoe UI\"",
			"Roboto",
			"\"Helvetica Neue\"",
			"Arial",
			"sans-serif",
			"\"Apple Color Emoji\"",
			"\"Segoe UI Emoji\"",
			"\"Segoe UI Symbol\""
		].join(",")
	},
	loginPage: {
		background: "#00000033",
		backdropFilter: "blur(10px)"
	}
});

const lightTheme = createTheme({
	typography: {
		fontFamily: [
			"-apple-system",
			"BlinkMacSystemFont",
			"\"Segoe UI\"",
			"Roboto",
			"\"Helvetica Neue\"",
			"Arial",
			"sans-serif",
			"\"Apple Color Emoji\"",
			"\"Segoe UI Emoji\"",
			"\"Segoe UI Symbol\""
		].join(",")
	},
	loginPage: {
		background: "#FFFFFF88",
		backdropFilter: "blur(3px)"
	}
});

const generateClassName = createGenerateClassName({
	disableGlobal: true
});

function App() {
	const dispatch = useAppDispatch();
	const search = new URLSearchParams(document.location.search);
	const code = search.get("code")!;

	useEffect(() => {
		dispatch(getUser(code));
	}, [code]);

	return (
		<div className="App" suppressHydrationWarning={true}>
			<StylesProvider generateClassName={generateClassName}>
				<ThemeProvider theme={lightTheme}>
					<Switch>
						<Redirect exact from="/" to="/app" />
						<Route exact path="/login" component={Login} />
						<Route exact path="/registration" component={Registration} />
						<Route exact path="/app" component={GamePages} />
						<Route exact path="/leaderboard" component={Leaderboard} />
						<Route exact path="/forum" component={Forum} />
						<Route exact path="/profile" component={Profile} />
					</Switch>
				</ThemeProvider>
			</StylesProvider>
		</div>
	);
}

export default App;
