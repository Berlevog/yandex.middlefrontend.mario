import { makeStyles } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { AxiosError } from "axios";
import React, { BaseSyntheticEvent, FormEvent, useState } from "react";
import { RESOURCES_URL } from "../../../constants/url";
import { updateAvatar, User } from "../../../services/auth";

const useStyles = makeStyles(() => ({
  avatar: {
    width: 180,
    height: 180,
    margin: "0 auto",
    marginBottom: 18,
  },
  buttonWrapper: {
    marginBottom: 18,
  },
  avatarInput: {
    marginLeft: 6,
  },
}));

export type AvatarFormProps = {
  handleSuccess: () => void;
  handleError: (e: AxiosError) => void;
  user: User;
};

export default function AvatarForm({ handleSuccess, handleError, user }: AvatarFormProps) {
  const classes = useStyles();
  const [avatar, setAvatar] = useState<File>();

  const handleChange = (event: BaseSyntheticEvent) => {
    const avatar = event.target.files[0];
    setAvatar(avatar);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!avatar) {
      return;
    }
    const formData = new FormData();
    formData.append("avatar", avatar);
    updateAvatar(formData).then(handleSuccess).catch(handleError);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Avatar
      </Typography>
      <Avatar alt={user.login} src={`${RESOURCES_URL}/${user.avatar}`} className={classes.avatar} />
      <form onSubmit={handleSubmit}>
        <Button
          variant="contained"
          component="label"
          fullWidth
          startIcon={<CloudUploadIcon />}
          className={classes.buttonWrapper}
        >
          Choose new avatar
          <input id="file" name="file" type="file" onChange={handleChange} className={classes.avatarInput} />
        </Button>
        <Button color="primary" variant="contained" fullWidth type="submit">
          Upload
        </Button>
      </form>
    </>
  );
}
