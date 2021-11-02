import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser as getUserAPI, signout as signoutAPI } from "../../services/auth";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  return await getUserAPI();
});

export const signout = createAsyncThunk("auth/logout", async () => {
  return await signoutAPI();
});

export default { getUser, signout };
