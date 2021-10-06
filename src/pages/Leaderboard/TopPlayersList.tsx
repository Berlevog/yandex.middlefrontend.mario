import React, { useCallback, useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { getResults, UserResult } from "../../services/leaderboard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadPending, loadSuccess, loadFailed } from "../../store/reducers/loader";
import { Loader } from "../../components/Loader";

export default function TopPlayersList() {
  const [results, setResults] = useState<UserResult[]>([]);

  const dispatch = useAppDispatch();

  function getLeaderboardResults() {
    return (dispatch) => {
      dispatch(loadPending());
      getResults()
        .then((response) => {
          dispatch(loadSuccess());
          setResults(response);
        })
        .catch(() => dispatch(loadFailed()));
    };
  }

  const updateResults = useCallback(() => {
    dispatch(getLeaderboardResults());
  }, []);

  useEffect(updateResults, []);

  const isLoading = useAppSelector(({ loader }) => loader.loading);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <Title>Топ игроков</Title>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Счет</TableCell>
            <TableCell>Монеты</TableCell>
            <TableCell>Время</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(({ data }) => (
            <TableRow key={data.score}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.score}</TableCell>
              <TableCell>{data.coins}</TableCell>
              <TableCell>{data.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
