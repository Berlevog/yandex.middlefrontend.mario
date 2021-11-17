import { combineReducers } from "redux";

import leaderboardReducer from "../slices/leaderboardSlice";
import authReducer from "../slices/authSlice";

export default combineReducers({ leaderboard: leaderboardReducer, auth: authReducer });
