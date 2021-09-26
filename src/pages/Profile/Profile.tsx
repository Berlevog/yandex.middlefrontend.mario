import React, { useEffect, useState, useCallback } from "react";
import { getUser, signout } from "../../services/auth";
import { User } from "../../services/auth";
import TextField from "@material-ui/core/TextField";

export default function Profile() {
  const [user, setUser] = useState<User>();

  const updateUser = useCallback(() => {
    getUser().then((user) => setUser(user));
  }, []);

  const signOut = useCallback(() => {
    signout().then(() => setUser(undefined));
  }, []);

  useEffect(updateUser, []);

  if (!user) {
    return <>Not Logged in</>;
  }

  return (
    <div>
      <TextField value={user.first_name} label="First Name" fullWidth disabled />
      <TextField value={user.second_name} label="Second Name" fullWidth disabled />
      <TextField value={user.email} label="Email" fullWidth disabled />
      <TextField value={user.login} label="Login" fullWidth disabled />

      <button onClick={signOut}>Log Out</button>
    </div>
  );
}
