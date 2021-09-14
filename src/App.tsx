/*
 * Copyright (c) 2021. Written by Leonid Artemev (me@artemev.it)
 */
import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Login, Registration } from "./pages";

const history = createBrowserHistory();
const StubComponent = () => (<div>Under construction! 👻</div>);

function App() {
	return (
		<div className="App">
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={StubComponent} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/registration" component={Registration} />
					<Route exact path="/app" component={StubComponent} />
					<Route exact path="/leaderboard" component={StubComponent} />
					<Route exact path="/forum" component={StubComponent} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
