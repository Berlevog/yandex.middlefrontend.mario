type LoaderState = {
  loading: boolean;
};

enum actions {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

const defaultState: LoaderState = {
  loading: false,
};

type ActionType = {
  type: actions;
};

export function userReducer(state: LoaderState = defaultState, { type }: ActionType): LoaderState {
  switch (type) {
    case actions.PENDING:
      return {
        ...state,
        loading: true,
      };
    case actions.SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case actions.ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}

export function loadSuccess() {
  return { type: actions.SUCCESS };
}
export function loadFailed() {
  return { type: actions.ERROR };
}
export function loadPending() {
  return { type: actions.PENDING };
}
