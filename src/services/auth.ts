import axios from "axios";

import { SIGNIN_URL, SIGNOUT_URL, SIGNUP_URL, UPDATE_PASSWORD_URL, UPDATE_USER_URL, USER_URL } from "../constants/url";

axios.defaults.withCredentials = true;

export interface User {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  email: string;
  phone: string;
  avatar: string;
}

export type SigninProps = Pick<User, "login"> & { password: string };

export type SignupProps = Pick<User, "email" | "login" | "first_name" | "second_name" | "phone"> & {
  password: string;
  password_confirm: string;
};

export type UpdateUserProps = Omit<User, "id" | "avatar">;

export type UpdatePasswordProps = {
  oldPassword: string;
  password: string;
};

export type UpdateAvatarProps = {
  avatar?: File;
};

export interface SignupResponse {
  id: number;
}

export const getUser = (cookies?: string): Promise<User> => {
  const options = {
    withCredentials: true,
    headers: {},
  };
  if (cookies) {
    options.headers = {
      Cookie: cookies,
    };
  }
  return axios.get(USER_URL, options).then((response) => response.data as User);
};

export const signin = (data: SigninProps): Promise<string> => axios.post(SIGNIN_URL, data);

export const signup = (data: SignupProps): Promise<SignupResponse> => axios.post(SIGNUP_URL, data);

export const signout = (): Promise<string> => axios.post(SIGNOUT_URL, { withCredentials: true });

export const updateUser = (data: UpdateUserProps): Promise<User> =>
  axios.put(UPDATE_USER_URL, data, { withCredentials: true });

export const updatePassword = (data: { oldPassword: string; newPassword: string }): Promise<string> =>
  axios.put(UPDATE_PASSWORD_URL, data, { withCredentials: true });
