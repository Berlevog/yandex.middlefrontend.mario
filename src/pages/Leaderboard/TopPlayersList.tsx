import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Title from "./Title";
import { data } from "./mockData";

export default function TopPlayersList() {
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
          {data.map((entity) => (
            <TableRow key={entity.id}>
              <TableCell>{entity.name}</TableCell>
              <TableCell>{entity.score}</TableCell>
              <TableCell>{entity.coins}</TableCell>
              <TableCell>{entity.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
