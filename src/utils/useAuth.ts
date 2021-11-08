import React from "react";
import { signin, signup, SigninProps, SignupProps } from "../services/auth";
import { useAppDispatch } from "../store/hooks";
import { getUser, signout } from "../store/thunks/auth";

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

  return { login, register, logout };
}
