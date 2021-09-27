import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useEffect, useState } from "react";

import { ResultsProps } from "../../Game";

export const enum END_MODE {
  "CONTINUE" = "continue",
  "EXIT" = "exit",
}

type EndProps = {
  onEnd: (mode: END_MODE) => void;
  results: ResultsProps;
};

const useStyles = makeStyles(() => ({
  root: {
    width: 1024,
    height: 702,
    background: "url(images/game-end.png) center center no-repeat",
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
    cursor: "pointer",
  },
  active: {
    listStyle: "square",
    listStyleImage: "url(/images/frog.png)",
  },
}));

const End: FC<EndProps> = ({ onEnd, results }) => {
  const [mode, setMode] = useState(END_MODE.CONTINUE);

  const toggleMode = () => {
    const newMode = mode === END_MODE.CONTINUE ? END_MODE.EXIT : END_MODE.CONTINUE;
    setMode(newMode);
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    switch (event.key) {
      case "Enter":
        onEnd(mode);
        break;
      case "ArrowUp":
      case "ArrowDown":
        toggleMode();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => document.removeEventListener("keyup", handleKeyUp);
  }, [mode]);

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLLIElement;
    const mode = target.dataset.gameMode;
    setMode(mode as END_MODE);
    onEnd(mode as END_MODE);
  };

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <audio src={"music/game-over.ogg"} autoPlay />
      <div className={classes.results}>
        <div className={classes.score}>{results.score}</div>
        <div className={classes.coins}>{results.coins}</div>
        <div>{results.time}</div>
      </div>
      <ul className={classes.options}>
        <li
          data-game-mode={END_MODE.CONTINUE}
          onClick={handleClick}
          className={mode === END_MODE.CONTINUE ? classes.active : ""}
        >
          {END_MODE.CONTINUE}
        </li>
        <li
          data-game-mode={END_MODE.EXIT}
          onClick={handleClick}
          className={mode === END_MODE.EXIT ? classes.active : ""}
        >
          {END_MODE.EXIT}
        </li>
      </ul>
    </div>
  );
};

export default End;
