import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useState } from "react";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { Loader } from "../../components/Loader";
import { Menu } from "../../components/Menu";
import { NO_CONTENT } from "../../config/constants";
import { useAppSelector } from "../../store/hooks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const DefaultLayout: FC = ({ children }) => {
  const classes = useStyles();

  const [open, setOpen] = useState(true);

  const toggleDrawerOpen = () => {
    setOpen(!open);
  };

  const loading = useAppSelector(({ loader }) => loader.loading);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={open} onClick={toggleDrawerOpen} />
      <Menu open={open} onClick={toggleDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {children || NO_CONTENT}
        </Container>
        <Box pt={4}>
          <Footer />
        </Box>
      </main>
    </div>
  );
};
export default DefaultLayout;
