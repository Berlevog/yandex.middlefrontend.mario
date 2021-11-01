import { applyMiddleware, createStore } from "redux";
import { createBrowserHistory, createMemoryHistory } from "history";
import createRootReducer from "./rootReducer";
import { RouterState } from "connected-react-router";
import thunk from "redux-thunk";

export interface State {
  auth: {
    loggedIn: Boolean;
  };
  leaderboard: {};
  router: RouterState;
}

export const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);

export function configureStore(initialState: State, url = "/") {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();

  const store = createStore(createRootReducer(history), initialState, applyMiddleware(thunk));

  return { store, history };
}
