import { combineReducers } from "redux";
import { loaderReducer } from "./loader";

import leaderboardReducer from "../slices/leaderboardSlice";
import authReducer from "../slices/authSlice";

export default combineReducers({ loader: loaderReducer, leaderboard: leaderboardReducer, auth: authReducer });
