import { signin, SigninProps, signup, SignupProps } from "../services/auth";
import store from "../store";
import { useAppDispatch } from "../store/hooks";
import { RootState } from "../store/store";
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

  const getLoggedIn = ({ auth }: RootState) => auth.loggedIn;

  const state = store.getState();
  return { login, register, logout, loggedIn: getLoggedIn(state) };
}
