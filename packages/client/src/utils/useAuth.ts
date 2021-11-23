import React from "react";
import { DEFAULT_THEME, setCurrent } from "../store/theme/themeSlice";
// import { fetchUser } from "store/slices/authSlice";
import { signin, signup, SigninProps, SignupProps } from "../services/auth";
import { useAppDispatch } from "../store/hooks";
import { signout } from "../store/thunks/auth";

export default function useAuth() {
  const dispatch = useAppDispatch();

  const login = async (data: SigninProps) => {
    await signin(data);
  };

  const register = async (data: SignupProps) => {
    await signup(data);
  };

  const logout = () => {
    dispatch(signout());
    dispatch(setCurrent(DEFAULT_THEME));
  };

  return { login, register, logout };
}
