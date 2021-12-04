import axios from "axios";

import { API_URL } from "../constants/url";

axios.defaults.withCredentials = true;

export type GetThreadProps = {
  id: number;
};

export type CreateThreadProps = {
  userId: number;
  title: string;
  content: string;
};

export type CreateCommentProps = {
  threadId: number;
  userId: number;
  title?: string;
  content: string;
};

export type CreateEmojiCommentProps = {
  commentId: number;
  emojiId: number;
  userId: number;
};

export const getThreads = () => {
  return axios.get(`${API_URL}/thread`).then(({ data }) => data);
};

export const getThread = ({ id }: GetThreadProps) => {
  return axios.get(`${API_URL}/thread/${id}`);
};

export const createThread = (data: CreateThreadProps) => {
  return axios.post(`${API_URL}/thread`, data);
};

export const createComment = (data: CreateCommentProps) => {
  return axios.post(`${API_URL}/comment`, data);
};

export const createEmojiComment = (data: CreateEmojiCommentProps) => {
  return axios.post(`${API_URL}/emoji`, data);
};

export const destroyEmojiComment = (data: CreateEmojiCommentProps) => {
  return axios.delete(`${API_URL}/emoji`, { data });
};

export const getEmojies = () => {
  return axios.get(`${API_URL}/emoji`);
};
