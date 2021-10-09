import axios from "axios";

import { LEADERBOARD_RESULTS_URL } from "../constants/url";

axios.defaults.withCredentials = true;

export type UserResult = {
  data: {
    score: number;
    coins: number;
    time: number;
    name: string;
  };
};

export type LeaderboardRequestProps = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export const getResults = (
  data: LeaderboardRequestProps = { ratingFieldName: "score", cursor: 0, limit: 100 }
): Promise<UserResult[]> => {
  return axios.post(LEADERBOARD_RESULTS_URL, data).then(({ data }) => data);
};
