import React, { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { getUser } from "../../store/user/userSlice";

type AuthWrapperProps = {
  children: React.ReactNode;
};

export function AuthWrapper({ children }: AuthWrapperProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return <>{children}</>;
}
