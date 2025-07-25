// components/GameBoard.jsx
export default function GameBoard() {
  return (
    <div className="grid grid-cols-3 gap-4 w-[90vw] max-w-sm">
      {[...Array(9)].map((_, i) => (
        <div
          key={i}
          className="bg-blue-500 hover:bg-blue-600 transition-colors rounded-md flex items-center justify-center text-white text-2xl select-none aspect-square"
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
}
