import React, { useEffect, useState } from "react";
import { DefaultLayout } from "../../layouts";
import ProfileForm from "./components/ProfileForm";
import PasswordForm from "./components/PasswordForm";
import AvatarForm from "./components/AvatarForm";
import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { AxiosError } from "axios";
import { SUCCESS_MESSAGE, UNKNOWN_ERROR } from "../../config/constants";
import { Alert } from "../../components/Alert";
import { getUser, User } from "../../services/auth";
import { AlertProps } from "../../components/Alert/Alert";

const useStyles = makeStyles(() => ({
  divider: {
    margin: 32,
  },
}));

let initialValues: User = {
  email: "",
  login: "",
  first_name: "",
  second_name: "",
  display_name: "",
  phone: "",
  avatar: "",
  id: 0,
};

export default function Profile() {
  const classes = useStyles();

  const [user, setUser] = useState<User>(initialValues);
  const [showMessage, setShowMessage] = useState(false);

  const fetchUser = () => {
    getUser().then((user) => setUser(user));
  };

  useEffect(fetchUser, []);

  const handleCloseAlert = () => {
    setShowMessage(false);
    setMessage(initialMessage);
  };

  const initialMessage: Pick<AlertProps, "message" | "severity"> = {
    message: "",
    severity: "error",
  };

  const [message, setMessage] = useState(initialMessage);

  const handleError = (e: AxiosError) => {
    const error = e?.response?.data?.reason;
    setShowMessage(true);
    setMessage({
      message: error || UNKNOWN_ERROR,
      severity: "error",
    });
  };

  const handleSuccess = () => {
    setShowMessage(true);
    setMessage({
      message: SUCCESS_MESSAGE,
      severity: "success",
    });
    fetchUser();
  };

  return (
    <DefaultLayout>
      <ProfileForm handleSuccess={handleSuccess} handleError={handleError} user={user} />
      <Divider variant="middle" className={classes.divider} />
      <PasswordForm handleSuccess={handleSuccess} handleError={handleError} />
      <Divider variant="middle" className={classes.divider} />
      <AvatarForm handleSuccess={handleSuccess} handleError={handleError} user={user} />
      {!!showMessage && <Alert message={message.message} severity={message.severity} onClose={handleCloseAlert} />}
    </DefaultLayout>
  );
}
