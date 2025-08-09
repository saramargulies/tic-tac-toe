"use client";

import { ScoreProps } from "@/lib/types";

export default function ScoreBoard({ score }: ScoreProps) {
  return (
    <div className="grid grid-cols-3 w-[90vw] max-w-sm text-center font-bold">
      <div>
        ✨Wins✨ <div> {score.wins} </div>
      </div>
      <div>
        😿Losses😿 <div> {score.losses} </div>
      </div>
      <div>
        👔Ties👔 <div> {score.ties} </div>
      </div>
      
    </div>
  );
}
