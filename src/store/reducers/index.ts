import { combineReducers } from "redux";
import { loaderReducer } from "./loader";

import leaderboardReducer from "../slices/leaderboardSlice";

export default combineReducers({ loader: loaderReducer, leaderboard: leaderboardReducer });
