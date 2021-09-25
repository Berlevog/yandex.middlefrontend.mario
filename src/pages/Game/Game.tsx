import React, { useEffect, useRef, useState } from "react";
import Application from "../../engine/Application";
import Player from "../../engine/Player";
import { useHistory } from "react-router-dom";

import { DefaultLayout } from "../../layouts";

import { Start, START_MODE } from "./components/Start";
import { End, END_MODE } from "./components/End";
import { generateResults } from "./mockData";

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

function Game() {
  const appRef = useRef<Application>(null);

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
    const obj = new Player();
    obj.position.y = 100;
    if (appRef.current) {
      appRef.current.addChild(obj);
    }
  }, []);

  if (stage === GameStage.START) {
    return (
      <DefaultLayout>
        <Start results={results} onStart={handleStart} />
      </DefaultLayout>
    );
  }

  if (stage === GameStage.GAME) {
    return <Application ref={appRef} width={1500} height={300} color={"#93BBEC"} />;
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
