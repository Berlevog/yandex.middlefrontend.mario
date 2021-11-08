import React from "react";
import MuiAlert, { AlertProps as MuiAlertProps } from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

export type AlertProps = MuiAlertProps & { message: string; onClose: () => void };

export default function Alert({ severity = "error", message, onClose }: AlertProps) {
  return (
    <Snackbar open={!!message}>
      <MuiAlert severity={severity} onClose={onClose}>
        {message}
      </MuiAlert>
    </Snackbar>
  );
}
