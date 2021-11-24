import { createAsyncThunk } from "@reduxjs/toolkit";
import { autorize } from "services/oauth";
import { getUser as getUserAPI, signout as signoutAPI } from "../../services/auth";

export const getUser = createAsyncThunk("auth/getUser", async (code: string | undefined) => {
	if (code) {
		await (autorize(code));
	}
	return await getUserAPI();
});

export const signout = createAsyncThunk("auth/logout", async () => {
	await signoutAPI();
});

export default { getUser, signout };
