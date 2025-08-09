export type Player = "X" | "O";
export type Cell = Player | ""; // A cell can be empty or contain a mark
export type Board = Cell[];
export type Winner = Player | "tie" | "none";

export interface Score {
  wins: number;
  losses: number;
  ties: number;
}

export interface ScoreProps {
  score: Score;
}
