import React, { FC, useEffect, useState, useCallback } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { ResultsProps } from "../../Game";

export enum START_MODE {
  "ONE_PLAYER" = "1 player",
  "TWO_PLAYER" = "2 player",
}

type StartProps = {
  onStart: (startMode: START_MODE) => void;
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
    listStyleImage: "url(/images/frog.png)",
  },
}));

const Start: FC<StartProps> = ({ onStart, results }) => {
  const [mode, setMode] = useState(START_MODE.ONE_PLAYER);

  const toggleMode = () => {
    const newMode = mode === START_MODE.ONE_PLAYER ? START_MODE.TWO_PLAYER : START_MODE.ONE_PLAYER;
    setMode(newMode);
  };

  const keyListener = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        onStart(mode);
        break;
      case "ArrowUp":
      case "ArrowDown":
        toggleMode();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", keyListener);
    return () => document.removeEventListener("keyup", keyListener);
  }, [mode]);

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLLIElement;
    const mode = target.dataset.gameMode;
    setMode(mode as START_MODE);
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
        <li
          data-game-mode={START_MODE.ONE_PLAYER}
          onClick={handleClick}
          className={mode === START_MODE.ONE_PLAYER ? classes.active : ""}
        >
          {START_MODE.ONE_PLAYER} game
        </li>
        <li
          data-game-mode={START_MODE.TWO_PLAYER}
          onClick={handleClick}
          className={mode === START_MODE.TWO_PLAYER ? classes.active : ""}
        >
          {START_MODE.TWO_PLAYER} game
        </li>
      </ul>
    </div>
  );
};

export default Start;
