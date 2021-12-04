import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getThreads as getThreadsAPI,
  getThread as getThreadAPI,
  createThread as createThreadAPI,
  createComment as createCommentAPI,
  CreateThreadProps,
  CreateCommentProps,
  GetThreadProps,
} from "../../services/forum";

export const getThreads: any = createAsyncThunk("thread/getThreads", async (_, { dispatch, getState }) => {
  dispatch(setThreads(await getThreadsAPI()));
});

export const createThread = createAsyncThunk("thread/createThread", async (data: CreateThreadProps) => {
  await createThreadAPI(data);
});

export const createComment = createAsyncThunk(
  "thread/createComment",
  async (data: CreateCommentProps, { dispatch }) => {
    await createCommentAPI(data);
    dispatch(getThreads());
  }
);

const threadSlice = createSlice({
  name: "thread",
  initialState: {
    threads: [],
  },
  reducers: {
    setThreads: (state, { payload }) => {
      state.threads = payload;
    },
  },
});

export const { setThreads } = threadSlice.actions;

//@ts-ignore
export const allThreadsSelector = (state) => state.threads.threads;

export default threadSlice.reducer;
