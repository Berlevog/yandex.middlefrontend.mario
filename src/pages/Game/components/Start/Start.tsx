import React, { FC, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ResultsProps } from "../../Game";

type StartProps = {
  onStart: () => void;
  results: ResultsProps;
};
const useStyles = makeStyles(() => ({
  root: {
    width: 1024,
    height: 702,
    background: "url(images/game-start.png) center center no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  results: {
    display: "flex",
    width: "100%",
    marginLeft: 150,
    marginTop: 67,
    marginBottom: 270,
    color: "white",
    fontSize: 20,
  },
  score: { marginRight: 180, width: 50 },
  coins: { marginRight: 560, width: 20 },
  options: {
    listStyle: "none",
    color: "white",
    fontSize: 54,
  },
  active: {
    listStyle: "square",
  },
}));

const Start: FC<StartProps> = ({ onStart, results }) => {
  const [mode, setMode] = useState(1);

  useEffect(() => {
    window.addEventListener("keyup", (event: React.KeyboardEvent<HTMLElement>) => {
      switch (event.key) {
        case "Enter":
          onStart();
          break;
      }
    });
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    const mode = parseInt(event.target.attributes["data-players"].value);
    setMode(mode);
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.results}>
        <div className={classes.score}>{results.score}</div>
        <div className={classes.coins}>{results.coins}</div>
        <div>{results.time}</div>
      </div>
      <ul className={classes.options}>
        <li data-players={1} onClick={handleClick} className={mode === 1 ? classes.active : ""}>
          1 player game
        </li>
        <li data-players={2} onClick={handleClick} className={mode === 2 ? classes.active : ""}>
          2 player game
        </li>
      </ul>
    </div>
  );
};

export default Start;
