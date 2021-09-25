import React, { useEffect, useRef, useState } from "react";
import Application from "../../engine/Application";
import Player from "../../engine/Player";
import { DefaultLayout } from "../../layouts";

import { Start } from "./components/Start";
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

  const [results, setResults] = useState<ResultsProps>({
    score: 0,
    coins: 0,
    time: 0,
  });

  const [stage, setStage] = useState(GameStage.START);

  const handleStart = () => {
    alert("start game ");
    setStage(GameStage.GAME);
    setTimeout(() => {
      setResults(generateResults());
      setStage(GameStage.END);
    }, 3000);
  };

  const handleEnd = (endMode: END_MODE) => {
    alert(endMode);
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
    return <Application ref={appRef} width={1000} height={300} color={"#93BBEC"} />;
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
