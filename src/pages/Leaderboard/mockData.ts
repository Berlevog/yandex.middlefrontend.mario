type Props = {
  id: number;
  name: string;
  score: number;
  coins: number;
  time: number;
};

function createData({ id, score, name, coins, time }: Props) {
  return { id, score, name, coins, time };
}

export const data = [
  createData({
    id: 0,
    score: 1100,
    name: "Elvis Presley",
    coins: 70,
    time: 1533,
  }),
  createData({
    id: 1,
    score: 1000,
    name: "Curt Cobain",
    coins: 67,
    time: 1452,
  }),
  createData({
    id: 2,
    score: 990,
    name: "Michael Jackson",
    coins: 65,
    time: 976,
  }),
  createData({
    id: 3,
    score: 570,
    name: "ABBA",
    coins: 35,
    time: 708,
  }),
];
