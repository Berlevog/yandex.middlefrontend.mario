import React from "react";
import { signin, signup, SigninProps, SignupProps } from "../services/auth";
import { useAppDispatch } from "../store/hooks";
import { getUser, signout } from "../store/thunks/auth";
import store from "../store";
import { RootState } from "../store/store";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const login = async (data: SigninProps) => {
    await signin(data);
    dispatch(getUser());
  };

  const register = async (data: SignupProps) => {
    await signup(data);
    dispatch(getUser());
  };

  const logout = () => {
    dispatch(signout());
  };

  const getLoggedIn = ({ auth }: RootState) => auth.loggedIn;

  const state = store.getState();
  return { login, register, logout, loggedIn: getLoggedIn(state) };
}
