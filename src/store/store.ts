import { configureStore as configureStoreToolkit } from "@reduxjs/toolkit";

import reducer from "./reducers";

export function configureStore() {
  return configureStoreToolkit({ reducer });
}

export const store = configureStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
