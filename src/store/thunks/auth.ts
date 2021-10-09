import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUser as getUserAPI, signout as signoutAPI } from "../../services/auth";

export const getUser = createAsyncThunk("auth/getUser", async () => {
  const response = await getUserAPI();
  return response;
});

export const signout = createAsyncThunk("auth/logout", async () => {
  await signoutAPI();
});

export default { getUser, signout };
