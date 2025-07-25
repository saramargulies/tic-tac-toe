"use client";

interface GameBoardProps {
  currentBoard: string[];
  setCurrentBoard: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function GameBoard({
  currentBoard,
  setCurrentBoard,
}: GameBoardProps) {
  return (
    <div className="grid grid-cols-3 w-[90vw] max-w-sm">
      {currentBoard.map((square, index) => {
        let color = square === "X" ? "sky-500" : "";
        return (
          <div
            className={`text-${color} text-purple-500 flex items-center justify-center border border-gray-200 text-[8vw] sm:text-[6vw] md:text-[4vw] font-bold aspect-square`}
            key={index}
            onClick={() => {
              if (square !== "") {
                return;
              }
              setCurrentBoard((prev: string[]) => {
                let prevBoard = [...prev];
                prevBoard[index] = "X";
                let emptyIndexes: number[] = [];
                let emptySpaces = prevBoard.filter((space, index) => {
                  if (space==="") emptyIndexes.push(index);
                  return space === "";
                });
                if (emptySpaces.length !== 0) {
                  let randomIndex = Math.floor(Math.random() * emptyIndexes.length)
                  prevBoard[emptyIndexes[randomIndex]] = "O"
                }
                return prevBoard;
              });
            }}
          >
            {square}
          </div>
        );
      })}
    </div>
  );
}
