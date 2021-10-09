import React, { useEffect, useState, useCallback } from "react";
import { getUser, signout } from "../../services/auth";
import { User } from "../../services/auth";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";
import { DefaultLayout } from "../../layouts";

export default function Profile() {
  const [user, setUser] = useState<User>();

  const updateUser = useCallback(() => {
    getUser().then((user) => setUser(user));
  }, []);

  useEffect(updateUser, []);

  if (!user) {
    return <>Not Logged in</>;
  }

  return (
    <DefaultLayout>
      <TextField value={user.first_name} label="First Name" fullWidth disabled />
      <TextField value={user.second_name} label="Second Name" fullWidth disabled />
      <TextField value={user.email} label="Email" fullWidth disabled />
      <TextField value={user.login} label="Login" fullWidth disabled />
    </DefaultLayout>
  );
}
