import React, { useState } from "react";
import { useSelector } from "react-redux";

import { useHistory } from "react-router-dom";

import { DefaultLayout } from "../../layouts";
import { sendResults } from "../../services/leaderboard";
import { State } from "../../store";
import fetchCityName from "../../utils/fetchCityName";
import { End, END_MODE } from "./components/End";

import { Start, START_MODE } from "./components/Start";
import Game from "./Game";
import { generateResults } from "./mockData";
import { createSelector } from "reselect";

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

function GamePages() {
  const history = useHistory();

  const [results, setResults] = useState<ResultsProps>({
    score: 0,
    coins: 0,
    time: 0,
  });

  const [stage, setStage] = useState(GameStage.START);

  const selectAuth = (state: State) => state.auth;
  const selectUserName = createSelector(selectAuth, (auth) => auth.user?.display_name || auth.user?.first_name || "");

  const userName = useSelector(selectUserName);

  const handleGameOver = () => {
    setResults(generateResults());
    setStage(GameStage.END);
  };

  const handleStart = (startMode: START_MODE) => {
    setStage(GameStage.GAME);
  };

  const handleResults = () => {
    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const city = await fetchCityName(coords.latitude, coords.longitude);
        sendResults({ data: { ...results, city, name: userName } });
        history.push("/leaderboard");
      },
      () => {
        console.log("geolocation failed");
        sendResults({ data: { ...results, city: "", name: userName } });
      }
    );
  };

  const handleEnd = (endMode: END_MODE) => {
    switch (endMode) {
      case END_MODE.CONTINUE:
        setStage(GameStage.GAME);
        break;

      case END_MODE.EXIT:
        handleResults();
        break;
    }
  };

  switch (stage) {
    case GameStage.START:
      return (
        <DefaultLayout>
          <Start results={results} onStart={handleStart} />
        </DefaultLayout>
      );
    case GameStage.END:
      return (
        <DefaultLayout>
          <End onEnd={handleEnd} results={results} />
        </DefaultLayout>
      );
    case GameStage.GAME:
      return <Game onGameOver={handleGameOver} />;
    default:
      return <div />;
  }
}

export default GamePages;
