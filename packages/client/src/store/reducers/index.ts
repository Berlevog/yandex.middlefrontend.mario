import { combineReducers } from "redux";
import authReducer from "../slices/authSlice";

import leaderboardReducer from "../slices/leaderboardSlice";
import { loaderReducer } from "./loader";

export default combineReducers({ loader: loaderReducer, leaderboard: leaderboardReducer, auth: authReducer });
