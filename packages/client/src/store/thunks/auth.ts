import { createAsyncThunk } from "@reduxjs/toolkit";
import { autorize } from "../../services/oauth";
import { getUser as getUserAPI, signout as signoutAPI } from "../../services/auth";
import { setUser } from "../../store/user/userSlice";

export const getUser = createAsyncThunk("auth/getUser", async (code: string | undefined, { dispatch }) => {
  if (code) {
    await autorize(code);
  }
  const user = await getUserAPI();
  dispatch(setUser(user));
});

export const signout = createAsyncThunk("auth/logout", async () => {
  await signoutAPI();
});

export default { getUser, signout };
