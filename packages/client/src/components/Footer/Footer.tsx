import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Berlevog © "}
      <Link
        href="https://github.com/Berlevog/yandex.middlefrontend.mario"
        color="textSecondary"
        target="_blank"
        underline="always"
      >
        repo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
export default Footer;
