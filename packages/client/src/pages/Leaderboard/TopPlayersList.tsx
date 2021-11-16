import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { UserResult } from "../../services/leaderboard";
import { getResults } from "../../services/leaderboard";

export default function TopPlayersList() {
  const [results, setResults] = useState<UserResult[]>([]);

  const fetchLeaderboard = () => {
    getResults().then((results) => setResults(results));
  };

  useEffect(fetchLeaderboard, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Топ игроков
      </Typography>

      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Имя</TableCell>
            <TableCell>Счет</TableCell>
            <TableCell>Монеты</TableCell>
            <TableCell>Время</TableCell>
            <TableCell>Город</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map(({ data }) => (
            <TableRow key={data.score}>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.score}</TableCell>
              <TableCell>{data.coins}</TableCell>
              <TableCell>{data.time}</TableCell>
              <TableCell>{data.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
