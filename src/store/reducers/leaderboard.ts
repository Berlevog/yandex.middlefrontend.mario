import { UserResult } from "../../services/leaderboard";

type LeaderboardState = {
  results: UserResult[];
};

enum actions {
  SET_RESULTS = "SET_RESULTS",
}

const defaultState: LeaderboardState = {
  results: [],
};

type ActionType = {
  type: actions;
};

export function leaderboardReducer(state: LeaderboardState = defaultState, { type }: ActionType): LeaderboardState {
  switch (type) {
    case actions.SET_RESULTS:
      return {
        ...state,
      };
    default:
      return state;
  }
}

export function loadResults() {
  return { type: actions.SET_RESULTS };
}
