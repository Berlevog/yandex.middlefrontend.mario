import { createSlice } from "@reduxjs/toolkit";
import { UserResult } from "../../services/leaderboard";
import { fetchLeaderboard } from "../thunks/leaderboard";

export interface leaderboardState {
  entities: UserResult[];
}

const initialState = {
  entities: [],
};

export const leaderboardSlice = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.fulfilled, (state: leaderboardState, action) => {
      state.entities = action.payload;
    });
  },
});

export default leaderboardSlice.reducer;
