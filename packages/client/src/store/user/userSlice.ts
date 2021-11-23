import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth";
import { getUser as getUserAPI } from "../../services/auth";
import { updateUser as updateAppUserAPI, getUser as getAppUserAPI } from "../../services/appAuth";
import { DEFAULT_THEME, setCurrent } from "../../store/theme/themeSlice";

export const getUser = createAsyncThunk("user/getApiUser", async (_, { dispatch }) => {
  const user = await getUserAPI();
  if (user) {
    dispatch(setUser(user));

    await updateAppUserAPI({
      id: user.id,
      name: user.display_name || user.first_name,
      avatar: user?.avatar,
    });
    const { data: appUser } = await getAppUserAPI({ id: user.id });
    await dispatch(setCurrent(appUser.themeName || DEFAULT_THEME));
  }
});

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
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

const { setUser } = authSlice.actions;

//@ts-ignore
export const yandexUserSelector = (state) => state.user.user;

export default authSlice.reducer;
