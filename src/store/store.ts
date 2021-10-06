import { createStore } from "redux";
import reducer from "./reducers";

export default function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState);
  return store;
}
