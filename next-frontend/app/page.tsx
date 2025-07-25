"use client";

import { useMemo, useState } from "react";
import GameBoard from "./GameBoard";

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState<string[]>([]);
    let checkForWinner = useMemo(() => {
    let winningConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];
    let xSpots = [];
    let oSpots = [];

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === "X") {
        xSpots.push(i);
      } else if (currentBoard[i] === "O") {
        oSpots.push(i);
      }
    }
    for (let winningCondition of winningConditions) {
      let xWins=winningCondition.every((value: number) => xSpots.includes(value))
      let oWins=winningCondition.every((value: number) => oSpots.includes(value))
      if (xWins) {
        return "X";
      }
      if (oWins) {
        return "O";
      }
      if (xSpots.length + oSpots.length===currentBoard.length && currentBoard.length!==0){
        return "tie"
      }
    }
  }, [currentBoard]);

  return (
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
      <main className="flex flex-col gap-8 items-center justify-center w-full ">
        <div className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Let's Play{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">
            TicTacToe
          </span>
        </div>

        <div className="mx-auto block">
          <button
            className="text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => setCurrentBoard(["", "", "", "", "", "", "", "", ""])}
          >
            {currentBoard.length === 0 ? "New Game" : "Restart"}
          </button>
        </div>
        <div className="w-full flex justify-center">
        {currentBoard.length === 0 ? (
          <></>
        ) : (
          <GameBoard currentBoard={currentBoard} setCurrentBoard={setCurrentBoard} />
        )}
        </div>
        <div className="w-full flex justify-center">
          {checkForWinner === "X"? ("You Won! 🎉"): checkForWinner==="O" ? ("You Lost ☹️") : checkForWinner==="tie" ? ( "It's a tie!") : (<></>)}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
