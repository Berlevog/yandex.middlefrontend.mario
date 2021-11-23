import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../services/auth";
import { getUser as fetchUserAPI } from "../../services/auth";

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

// @ts-ignore
export const fetchUser = () => async (dispatch) => {
  try {
    await fetchUserAPI().then((user) => {
      dispatch(setUser(user));
    });
    // @ts-ignore
  } catch (e) {
    // @ts-ignore
    return console.log(e.message);
  }
};

export default authSlice.reducer;
