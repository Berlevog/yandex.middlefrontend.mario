import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth";
import { getUser, signout } from "../thunks/auth";

export interface authState {
  user: User | null;
  loggedIn: boolean;
}

const initialState: authState = {
  user: null,
  loggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state: authState, action) => {
        state.user = action.payload;
        state.loggedIn = true;
      })
      .addCase(signout.fulfilled, (state: authState) => {
        state.user = null;
        state.loggedIn = false;
      });
  },
});

export default authSlice.reducer;
