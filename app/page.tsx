"use client";

import { useEffect, useState } from "react";
import GameBoard from "./gameComponents/GameBoard";
import { ThemeToggler } from "./ThemeToggler";
import { Toggle } from "@/components/ui/toggle";
import { checkForWinner, makeComputermove } from "@/lib/gameUtilities";
import { Board, Score } from "@/lib/types";
import ScoreBoard from "./gameComponents/ScoreBoard";

export default function Home() {
  const [currentBoard, setCurrentBoard] = useState<Board>([]);
  const [winner, setWinner] = useState<"X" | "O" | "tie" | "none" | undefined>(
    undefined
  );
  const [computersTurn, setComputersTurn] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [first, setFirst] = useState<boolean>(true);
  const [difficulty, setDifficulty] = useState<number>(2);
  const [score, setScore] = useState<Score>({ wins: 0, losses: 0, ties: 0 });

  // Update the score in localStorage
  useEffect(() => {
    localStorage.setItem("score", JSON.stringify(score));
  }, [score]);

  // Check for a winner, setGameOver
  useEffect(() => {
    const checkWinner = checkForWinner(currentBoard);
    if (checkWinner !== "none") {
      setWinner(checkWinner);
      setGameOver(true);
      setScore((prev) => {
        const newScore = { ...prev };
        switch (checkWinner) {
          case "X":
            newScore.wins++;
            break;
          case "O":
            newScore.losses++;
            break;
          case "tie":
            newScore.ties++;
        }
        return newScore;

      });
    }
  }, [currentBoard]);
  // Take computers turn
  useEffect(() => {
    if (gameOver) return;
    if (computersTurn && !gameOver) {
      const newBoard = makeComputermove(currentBoard, gameOver, difficulty);
      setCurrentBoard(newBoard);
      setComputersTurn(false);
    }
  }, [computersTurn, gameOver, difficulty, currentBoard]);

  // Allow computer to take turn if game over is false
  useEffect(() => {
    if (!gameOver && !computersTurn && currentBoard.length !== 0) {
      const xCount = currentBoard.filter((c) => c === "X").length;
      const oCount = currentBoard.filter((c) => c === "O").length;
      if ((xCount >= oCount && !first) || (xCount > oCount && first)) {
        setComputersTurn(true);
      }
    }
  }, [currentBoard, gameOver, computersTurn, first]);

  return (
    <>
      <div className="font-sans flex flex-col items-center justify-center min-h-screen p-4 sm:p-8">
        <main className="flex flex-col gap-8 items-center justify-center w-full ">
          <ScoreBoard score={score} />
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
              const nextBoard: Board =
                currentBoard.length === 0 ? Array(9).fill("") : [];
              setCurrentBoard(nextBoard);
              setComputersTurn(first ? false : true);
              setGameOver(false);
              setWinner(undefined);
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
                  <Toggle
                    pressed={first}
                    onPressedChange={() => setFirst(true)}
                  >
                    First
                  </Toggle>
                  <Toggle
                    pressed={!first}
                    onPressedChange={() => setFirst(false)}
                  >
                    Second
                  </Toggle>
                </div>
              </div>

              {/* Difficulty Toggle */}
              <div className="flex flex-col items-center text-center">
                <div className="font-semibold mb-1">Difficulty</div>
                <div className="flex gap-2">
                  <Toggle
                    pressed={difficulty === 1}
                    onPressedChange={() => setDifficulty(1)}
                  >
                    Easy
                  </Toggle>
                  <Toggle
                    pressed={difficulty === 2}
                    onPressedChange={() => setDifficulty(2)}
                  >
                    Medium
                  </Toggle>
                  <Toggle
                    pressed={difficulty === 3}
                    onPressedChange={() => setDifficulty(3)}
                  >
                    Hard
                  </Toggle>
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
