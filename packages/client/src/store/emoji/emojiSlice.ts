import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getThreads } from "../../store/thread/threadSlice";
import {
  getEmojies as getEmojiesAPI,
  createEmojiComment as createEmojiCommentAPI,
  destroyEmojiComment as destroyEmojiCommentAPI,
  CreateEmojiCommentProps,
} from "../../services/forum";

export const getEmojies = createAsyncThunk("thread/getEmojies", async (_, { dispatch }) => {
  const { data } = await getEmojiesAPI();
  dispatch(setEmojies(data));
});

export const createEmojiComment = createAsyncThunk(
  "thread/createEmojiComment",
  async (data: CreateEmojiCommentProps, { dispatch }) => {
    await createEmojiCommentAPI(data);
    dispatch(getThreads());
  }
);

export const destroyEmojiComment = createAsyncThunk(
  "thread/destroyEmojiComment",
  async (data: CreateEmojiCommentProps, { dispatch }) => {
    await destroyEmojiCommentAPI(data);
    dispatch(getThreads());
  }
);

const emojiSlice = createSlice({
  name: "thread",
  initialState: {
    emojies: [],
  },
  reducers: {
    setEmojies: (state, action) => {
      state.emojies = action.payload;
    },
  },
});

export const { setEmojies } = emojiSlice.actions;

//@ts-ignore
export const emojiesSelector = (state) => {
  return state.emoji.emojies;
};

export default emojiSlice.reducer;
