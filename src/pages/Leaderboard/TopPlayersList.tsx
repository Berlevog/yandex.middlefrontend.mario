import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { UserResult } from "../../services/leaderboard";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Loader } from "../../components/Loader";
import { fetchLeaderboard } from "../../store/thunks/leaderboard";

export default function TopPlayersList() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, []);

  const results: UserResult[] = useAppSelector(({ leaderboard }) => leaderboard.entities);

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
