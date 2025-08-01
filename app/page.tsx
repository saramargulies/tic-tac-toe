"use client";

import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import { ThemeToggler } from "./ThemeToggler";
import { Toggle } from "@/components/ui/toggle";

type Player = "X" | "O";
type Cell = Player | ""; // A cell can be empty or contain a mark
export type Board = Cell[];
type Winner = Player | "tie" | "none";

export default function Home() {
const [currentBoard, setCurrentBoard] = useState<Board>([]);
const [winner, setWinner] = useState<"X" | "O" | "tie" | "none" | undefined>(undefined);
  const [computersTurn, setComputersTurn] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true)
  const [difficulty, setDifficulty] = useState<number>(2)

  const winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

  const checkForWinner = (): Winner => {

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

  const makeComputermove = () =>{
    if (gameOver) return;
      setCurrentBoard((prev) => {
        const prevBoard = [...prev];
        const emptyIndexes: number[] = [];
        const emptySpaces = prevBoard.filter((space, index) => {
          if (space === "") emptyIndexes.push(index);
          return space === "";
        });

        const findOptimalSpot = ()=>{
          for (const winningCondition of winningConditions){
            const [a, b, c] = winningCondition
            const values = [prevBoard[a], prevBoard[b], prevBoard[c]]
            const xCount = values.filter((v) => v === "X").length;
            const oCount = values.filter((v) => v === "O").length;
            const emptyCount = values.filter((v) => v === "").length;
          // Try to make computer win
           if (oCount ===2 && emptyCount === 1 && difficulty>2){
            const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
              if (typeof emptyIndex === "number") return emptyIndex;
            }
          // Block player from winning
            if (xCount === 2 && emptyCount === 1 && difficulty>2)  {
              const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
              if (typeof emptyIndex === "number") return emptyIndex;
            }
          }
          return -1;
        }

        const optimalSpot = findOptimalSpot()

        if (emptySpaces.length !== 0) {
          // Take the center tile ASAP
          if (prevBoard[4] === "" && difficulty>1) {
            prevBoard[4] = "O";
          // Block any attempts to win
          } else if (optimalSpot!==-1){
            prevBoard[optimalSpot]= "O"
          // Take a random spot
          } else {
            const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
            prevBoard[emptyIndexes[randomIndex]] = "O";
          }
        }
        return prevBoard;
      });

  }
// Check for a winner, setGameOver
useEffect(() => {
  const checkWinner = checkForWinner();
  if (checkWinner !== "none") {
    setWinner(checkWinner);
    setGameOver(true);
  }
}, [currentBoard]);
// Take computers turn when appropriate
  useEffect(() => {
    if (gameOver) return
    if ((computersTurn && !gameOver)) {
      makeComputermove()
      setComputersTurn(false);
    }
  }, [computersTurn, gameOver, difficulty]);

// Allow computer to take turn if game over is false
useEffect(() => {
  if (!gameOver && !computersTurn && currentBoard.length !== 0) {
    const xCount = currentBoard.filter((c) => c === "X").length;
    const oCount = currentBoard.filter((c) => c === "O").length;
    if (xCount > oCount) {
      setComputersTurn(true);
    }
  }
}, [currentBoard, gameOver, computersTurn]);

  return (
    <>
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-8 items-center justify-center w-full ">
        <div className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
          Let&apos;s Play{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">
            TicTacToe
          </span>
    <ThemeToggler />
        </div>
  
          <button
            className="text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 "
            onClick={() => {
              const nextBoard: Board = currentBoard.length === 0 ? Array(9).fill("") : []
              setCurrentBoard(nextBoard);
              setComputersTurn(first ? false : true);
              setGameOver(false);
              setWinner(undefined)
            }}
          >
            {currentBoard.length === 0 ? "New Game" : "Restart"}
          </button>
          {currentBoard.length === 0 && (
            <div className="flex flex-col sm:flex-row sm:justify-start items-center gap-4">
              {/* Turn Toggle */}
              <div className="flex flex-col items-center text-center">
                <div className="font-semibold mb-1">Go</div>
                <div className="flex gap-2">
                  <Toggle pressed={first} onPressedChange={() => setFirst(true)}>First</Toggle>
                  <Toggle pressed={!first} onPressedChange={() => setFirst(false)}>Second</Toggle>
                </div>
              </div>

              {/* Difficulty Toggle */}
              <div className="flex flex-col items-center text-center">
                <div className="font-semibold mb-1">Difficulty</div>
                <div className="flex gap-2">
                  <Toggle pressed={difficulty === 1} onPressedChange={() => setDifficulty(1)}>Easy</Toggle>
                  <Toggle pressed={difficulty === 2} onPressedChange={() => setDifficulty(2)}>Medium</Toggle>
                  <Toggle pressed={difficulty === 3} onPressedChange={() => setDifficulty(3)}>Hard</Toggle>
                </div>
              </div>
            </div>
          )}

        <div className="w-full flex justify-center">
          {currentBoard.length === 0 ? (
            <></>
          ) : (
            <GameBoard
              currentBoard={currentBoard}
              setCurrentBoard={setCurrentBoard}
              setComputersTurn={setComputersTurn}
              gameOver={gameOver}
            />
          )}
        </div>
        <div className="w-full flex justify-center">
          {winner === "X" ? (
            "You Won! 🎉"
          ) : winner === "O" ? (
            "You Lost ☹️"
          ) : winner === "tie" ? (
            "It's a tie!"
          ) : (
            <></>
          )}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
    </>
  );
}
