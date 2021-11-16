export const generateResults = () => {
  return {
    score: getRandomInt(100, 3000),
    coins: getRandomInt(0, 25),
    time: getRandomInt(2, 1000),
  };
};

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
