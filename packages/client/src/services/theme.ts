import axios from "axios";

import { API_URL } from "../constants/url";

axios.defaults.withCredentials = true;

export const getThemes = () => {
  return axios.get(`${API_URL}/theme`);
};
