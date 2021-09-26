import React, { useEffect, useState, useCallback } from "react";
import { getUser, signout } from "../../services/auth";
import { User } from "../../services/auth";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router";

export default function Profile() {
  const history = useHistory();

  const [user, setUser] = useState<User>();

  const updateUser = useCallback(() => {
    getUser().then((user) => setUser(user));
  }, []);

  const signOut = useCallback(() => {
    signout().then(() => history.push("/login"));
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
