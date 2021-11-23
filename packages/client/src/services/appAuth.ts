import axios from "axios";

import { DEFAULT_THEME, DARK_THEME } from "../store/theme/themeSlice";

import { API_URL } from "../constants/url";

axios.defaults.withCredentials = true;

export type UpdateUserProps = {
  id: number;
  themeName?: typeof DEFAULT_THEME | typeof DARK_THEME;
  name?: string;
  avatar?: string;
};

export type GetUserProps = {
  id: number;
};

export const updateUser = (data: UpdateUserProps) => {
  return axios.post(`${API_URL}/user`, data);
};

export const getUser = ({ id }: GetUserProps) => {
  return axios.get(`${API_URL}/user/${id}`);
};
