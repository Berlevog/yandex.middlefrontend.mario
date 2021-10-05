import React from "react";
import MuiAlert, { AlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export default function Alert({
  severity = "error",
  message,
  onClose,
}: AlertProps & { message: string; onClose: () => void }) {
  return (
    <Snackbar open={!!message}>
      <MuiAlert severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
