import { Board, Winner } from "./types";

export const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const makeComputermove = (currentBoard: Board, gameOver: boolean, difficulty: number) => {
  const prevBoard = [...currentBoard];
  const emptyIndexes: number[] = [];
  const emptySpaces = prevBoard.filter((space, index) => {
    if (space === "") emptyIndexes.push(index);
    return space === "";
  });

  const findOptimalSpot = () => {
    for (const winningCondition of winningConditions) {
      const [a, b, c] = winningCondition;
      const values = [prevBoard[a], prevBoard[b], prevBoard[c]];
      const xCount = values.filter((v) => v === "X").length;
      const oCount = values.filter((v) => v === "O").length;
      const emptyCount = values.filter((v) => v === "").length;
      // Try to make computer win
      if (oCount === 2 && emptyCount === 1 && difficulty > 2) {
        const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
        if (typeof emptyIndex === "number") return emptyIndex;
      }
      // Block player from winning
      if (xCount === 2 && emptyCount === 1 && difficulty > 2) {
        const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
        if (typeof emptyIndex === "number") return emptyIndex;
      }
    }
    return -1;
  };

  const optimalSpot = findOptimalSpot();

  if (emptySpaces.length !== 0) {
    // Take the center tile ASAP
    if (prevBoard[4] === "" && difficulty > 1) {
      prevBoard[4] = "O";
      // Block any attempts to win
    } else if (optimalSpot !== -1) {
      prevBoard[optimalSpot] = "O";
      // Take a random spot
    } else {
      const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
      prevBoard[emptyIndexes[randomIndex]] = "O";
    }
  }
  return prevBoard;
};

export const checkForWinner = (currentBoard: Board): Winner => {
  const xSpots: number[] = [];
  const oSpots: number[] = [];

  for (let i = 0; i < currentBoard.length; i++) {
    if (currentBoard[i] === "X") {
      xSpots.push(i);
    } else if (currentBoard[i] === "O") {
      oSpots.push(i);
    }
  }
  for (const winningCondition of winningConditions) {
    const xWins = winningCondition.every((value: number) =>
      xSpots.includes(value)
    );

    const oWins = winningCondition.every((value: number) =>
      oSpots.includes(value)
    );
    if (xWins) {
      return "X";
    }
    if (oWins) {
      return "O";
    }
  }
  if (
    xSpots.length + oSpots.length === currentBoard.length &&
    currentBoard.length !== 0
  ) {
    return "tie";
  }
  return "none";
};
