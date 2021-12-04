import { connectRouter } from "connected-react-router";
import { History } from "history";
import { combineReducers } from "redux";
import { State } from "./rootStore";
import threadsReducer from "./thread/threadSlice";
import drawerReducer from "./drawer/drawerSlice";
import emojiReducer from "./emoji/emojiSlice";
import userReducer from "./user/userSlice";
import themeReducer from "./theme/themeSlice";

import authReducer from "./slices/authSlice";
// import leaderboardReducer from "./slices/leaderboardSlice";

export default (history: History) =>
  // @ts-ignore
  combineReducers<State>({
    // @ts-ignore
    auth: authReducer,
    // leaderboard: leaderboardReducer,
    threads: threadsReducer,
    drawer: drawerReducer,
    emoji: emojiReducer,
    user: userReducer,
    theme: themeReducer,
    router: connectRouter(history),
  });
