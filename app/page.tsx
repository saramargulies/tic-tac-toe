"use client";

import { useEffect, useState } from "react";
import GameBoard from "./GameBoard";
import { ThemeToggler } from "./ThemeToggler";
import { Toggle } from "@/components/ui/toggle";

interface xCheck {
  indices: number[],
  winningIndex : number | undefined
}

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | number>();
  const [computersTurn, setComputersTurn] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true)

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

  const checkForWinner = (): string | number => {

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
      setCurrentBoard((prev: string[]) => {
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
          
           if (oCount ===2 && emptyCount === 1){
            const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
              if (typeof emptyIndex === "number") return emptyIndex;
            }

            if (xCount === 2 && emptyCount === 1) {
              const emptyIndex = winningCondition.find((i) => prevBoard[i] === "");
              if (typeof emptyIndex === "number") return emptyIndex;
            }
          }
          return -1;
        }

        const optimalSpot = findOptimalSpot()

        if (emptySpaces.length !== 0) {
          // Take the center tile ASAP
          if (prevBoard[4] === "") {
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
useEffect(() => {

  const checkWinner = checkForWinner();
  if (checkWinner !== "none") {
    setWinner(checkWinner);
    setGameOver(true);
  }
}, [currentBoard]);

  useEffect(() => {
    if ((computersTurn && !gameOver)) {
      makeComputermove()
      setComputersTurn(false);
    }
  }, [computersTurn]);
  return (
    <>
    <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
    <ThemeToggler />
      <main className="flex flex-col gap-8 items-center justify-center w-full ">
        <div className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
          Let&apos;s Play{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-purple-500 from-sky-400">
            TicTacToe
          </span>
        </div>
  
        <div className="flex mx-auto block">
          <button
            className="text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            onClick={() => {
              const nextBoard = currentBoard.length === 0 ? ["", "", "", "", "", "", "", "", "", ] : []
              setCurrentBoard(nextBoard);
              setComputersTurn(first ? false : true);
              setGameOver(false);
              setWinner(undefined)
            }}
          >
            {currentBoard.length === 0 ? "New Game" : "Restart"}
          </button>
          {currentBoard.length===0 && <div className="px-5">Go <Toggle className="mx-2" pressed={first} onPressedChange={()=>setFirst(true)}>First</Toggle><Toggle onPressedChange={()=>setFirst(false)} pressed={!first}>Second</Toggle></div>
          }

        </div>
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
