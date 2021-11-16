import { configureStore, getInitialState } from "./store";

export { default as App } from "./App";
export const getStore = (location = "/") => configureStore(getInitialState(location), location);
