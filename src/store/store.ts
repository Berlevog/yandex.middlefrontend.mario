import { configureStore } from "@reduxjs/toolkit";

import reducer from "./reducers";

export const store = configureStore({ reducer });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// import { createStore, applyMiddleware } from "redux";

// export default function configureStore(preloadedState) {
//   const store = createStore(reducer, preloadedState, applyMiddleware(thunk));
//   return store;
// }
