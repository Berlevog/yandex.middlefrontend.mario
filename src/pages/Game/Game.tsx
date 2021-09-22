import React, { useEffect, useRef, useState } from "react";
import Application from "../../engine/Application";
import Player from "../../engine/Player";
import { DefaultLayout } from "../../layouts";

import { Start } from "./components/Start";
import { End } from "./components/End";
import { generateResults } from "./mockData";

export type ResultsProps = {
  score: number;
  coins: number;
  time: number;
};

function Game() {
  const appRef = useRef<Application>(null);

  const [results, setResults] = useState<ResultsProps>({
    score: 0,
    coins: 0,
    time: 0,
  });

  const handleStart = () => {
    console.log("start");
  };

  useEffect(() => {
    const obj = new Player();
    obj.position.y = 100;
    if (appRef.current) {
      appRef.current.addChild(obj);
    }
  }, []);

  return (
    <DefaultLayout>
      <Start results={results} onStart={handleStart} />
      <Application ref={appRef} width={1000} height={300} color={"#93BBEC"} />
      <End results={generateResults()} />
    </DefaultLayout>
  );
}

export default Game;
