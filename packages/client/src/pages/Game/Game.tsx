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
    const player = new Player({});
    const world = new World({ player, onGameOver });
    if (appRef.current) {
      //@ts-ignore
      appRef.current.addChild(world);
      appRef.current.addChild(player);
    }
  }, []);

  return (
    <Box className={classes.root}>
      <Application ref={appRef} width={800} height={500} color={"#000"} />
    </Box>
  );
}

export default Game;
