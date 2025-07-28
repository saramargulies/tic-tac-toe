"use client";

interface GameBoardProps {
  currentBoard: string[];
  setCurrentBoard: React.Dispatch<React.SetStateAction<string[]>>;
  setComputersTurn: React.Dispatch<React.SetStateAction<boolean>>;
  gameOver: boolean
}

export default function GameBoard({
  currentBoard,
  setCurrentBoard,
  setComputersTurn,
  gameOver
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 w-[90vw] max-w-sm">
      {currentBoard.map((square, index) => {
        const color = square === "X" ? "text-sky-500" : "text-purple-500";
        return (
          <div
            className={`${color} flex items-center justify-center border border-gray-200 text-[8vw] sm:text-[6vw] md:text-[4vw] font-bold aspect-square`}
            key={index}
            onClick={() => {
              if (square !== "" || gameOver) {
                return;
              }
              setCurrentBoard((prev: string[]) => {
                const prevBoard = [...prev];
                prevBoard[index] = "X";
                return prevBoard;
              });
              setComputersTurn(true)
            }}
          >
            {square}
          </div>
        );
      })}
    </div>
  );
}
