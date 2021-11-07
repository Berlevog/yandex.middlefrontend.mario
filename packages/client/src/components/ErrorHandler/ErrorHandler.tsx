import Grid from "@material-ui/core/Grid";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { Footer } from "../Footer";

const useStyles = () => ({
  root: {
    flexGrow: 1,
    margin: "auto",
    maxWidth: 750,
    paddingTop: 200,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  content: {
    marginBottom: 80,
  },
});

interface Props {
  children: ReactNode;
  classes: Record<keyof ReturnType<typeof useStyles>, string>;
}

interface State {
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorHandler extends Component<Props, State> {
  public state: State = {
    error: null,
    errorInfo: null,
  };

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  render() {
    if (this.state.errorInfo) {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={2} className={classes.content}>
            <Grid item xs={6}>
              <img className={classes.img} src="/images/error-mushroom.png" />
            </Grid>
            <Grid item xs={6} container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h3">
                    Ошибка!
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    <details style={{ whiteSpace: "pre-wrap" }}>
                      {this.state.error && this.state.error.toString()}
                      <br />
                      {this.state.errorInfo.componentStack}
                    </details>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Footer />
        </div>
      );
    }
    return this.props.children;
  }
}

export default withStyles(useStyles)(ErrorHandler);
