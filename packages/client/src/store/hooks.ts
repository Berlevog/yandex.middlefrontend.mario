import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { State } from "./rootStore";

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
