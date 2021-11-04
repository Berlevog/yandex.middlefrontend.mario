import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useRef } from "react";
import Application from "../../engine/Application";
import Player from "../../engine/Player";

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

type GameProps = {
  onGameOver: Function;
};

function Game({ onGameOver }: GameProps) {
  const appRef = useRef<Application>(null);
  const classes = useStyles();

  useEffect(() => {
    const player = new Player();
    // const obj = new PhysicalObject({ texture: new ResourceImage("images/cloud.png") });
    const world = new World({ player, onGameOver });
    if (appRef.current) {
      appRef.current.addChild(world);
      appRef.current.addChild(player);
      // appRef.current.addChild(obj);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Application ref={appRef} width={800} height={500} color={"#93BBEC"} />
    </Box>
  );
}

export default Game;
