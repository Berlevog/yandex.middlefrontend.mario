import { applyMiddleware, createStore, compose } from "redux";
import { createBrowserHistory, createMemoryHistory } from "history";
import createRootReducer from "./rootReducer";
import { RouterState } from "connected-react-router";
import thunk from "redux-thunk";
import { ThreadProps } from "pages/Forum/components/Thread/Thread";

export interface State {
  auth: {
    user: any;
    loggedIn: Boolean;
  };
  threads: {
    threads: ThreadProps[];
  };
  drawer: {
    isOpen: Boolean;
  };
  theme: {
    current: {};
    themes: [];
  };
  // leaderboard: {};
  router: RouterState;
}

export const isServer = !(typeof window !== "undefined" && window.document && window.document.createElement);

export function configureStore(initialState: State, url = "/") {
  const history = isServer ? createMemoryHistory({ initialEntries: [url] }) : createBrowserHistory();

  const composeEnhancers = (!isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const store = createStore(createRootReducer(history), initialState, composeEnhancers(applyMiddleware(thunk)));

  return { store, history };
}
