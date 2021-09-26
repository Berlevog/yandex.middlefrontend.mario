import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef, useState  } from "react";
import Application from "../../engine/Application";
import PhysicalObject from "../../engine/PhysicalObject";
import Player from "../../engine/Player";

import { useHistory } from "react-router-dom";

import { DefaultLayout } from "../../layouts";

import { Start, START_MODE } from "./components/Start";
import { End, END_MODE } from "./components/End";
import { generateResults } from "./mockData";

import World from "../../engine/World";

export type ResultsProps = {
  score: number;
  coins: number;
  time: number;
};

enum GameStage {
  "START" = "start",
  "GAME" = "game",
  "END" = "end",
}

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000",
    height: "100vh",
  },
}));

function Game() {
  const appRef = useRef<Application>(null);
  const classes = useStyles();

  const history = useHistory();

  const [results, setResults] = useState<ResultsProps>({
    score: 0,
    coins: 0,
    time: 0,
  });

  const [stage, setStage] = useState(GameStage.START);

  const mockEndGame = () => {
    setTimeout(() => {
      setResults(generateResults());
      setStage(GameStage.END);
    }, 3000);
  };

  const handleStart = (startMode: START_MODE) => {
    alert(`start game. mode: ${startMode}`);
    setStage(GameStage.GAME);
    mockEndGame();
  };

  const handleEnd = (endMode: END_MODE) => {
    switch (endMode) {
      case END_MODE.CONTINUE:
        setStage(GameStage.GAME);

        mockEndGame();

        break;

      case END_MODE.EXIT:
        history.push("/leaderboard");
        break;
    }
  };

  useEffect(() => {
    const player = new Player();
    const obj = new PhysicalObject();
    const world = new World(player);
    if (appRef.current) {
      appRef.current.addChild(world);
      appRef.current.addChild(player);
      appRef.current.addChild(obj);
    }
  }, [stage]);
  if (stage === GameStage.START) {
    return (
      <DefaultLayout>
        <Start results={results} onStart={handleStart} />
      </DefaultLayout>
    );
  }

  if (stage === GameStage.GAME) {
    return (
      <Box className={classes.root}>
        <Application ref={appRef} width={800} height={500} color={"#93BBEC"} />
      </Box>
    );
  }

  if (stage === GameStage.END) {
    return (
      <DefaultLayout>
        <End onEnd={handleEnd} results={results} />
      </DefaultLayout>
    );
  }
}

export default Game;
