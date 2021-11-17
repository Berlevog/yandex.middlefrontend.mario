import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { State } from "./rootStore";

import authReducer from "./slices/authSlice";
import leaderboardReducer from "./slices/leaderboardSlice";

export default (history: History) =>
	// @ts-ignore
	combineReducers<State>({
		auth: authReducer, leaderboard: leaderboardReducer, router: connectRouter(history)
	});
