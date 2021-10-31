import { createAsyncThunk } from "@reduxjs/toolkit";
import { getResults } from "../../services/leaderboard";

export const fetchLeaderboard = createAsyncThunk("leaderboard/fetchLeaderboard", async () => {
  const response = await getResults();
  return response;
});
