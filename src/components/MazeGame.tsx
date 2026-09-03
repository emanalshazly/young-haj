import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

const MAZE = [
  'S..####',
  '##...##',
  '####.##',
  '#.....#',
  '#.###.#',
  '#...#.#',
  '###...E'
];

export function MazeGame({ onComplete }: { onComplete: (stars: number) => void }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [won, setWon] = useState(false);

  useEffect(() => {
    if (MAZE[pos.y][pos.x] === 'E' && !won) {
      setWon(true);
      setTimeout(() => onComplete(3), 1000); // 3 stars
    }
  }, [pos, won, onComplete]);

  const move = (dx: number, dy: number) => {
    if (won) return;
    const nx = pos.x + dx;
    const ny = pos.y + dy;
    if (ny >= 0 && ny < 7 && nx >= 0 && nx < 7) {
      if (MAZE[ny][nx] !== '#') {
        setPos({ x: nx, y: ny });
      }
    }
  };

  return (
    <div className="bg-[#FFF8E1] rounded-3xl p-6 md:p-8 w-full mb-4 border-4 border-[#FFD54F] shadow-sm relative z-10 mt-6 flex flex-col items-center">
      <div className="inline-block bg-[#FFB300] text-white font-bold px-6 py-2 rounded-full mb-6 transform -translate-y-12 shadow-sm border-4 border-white text-xl">
        متاهة الكعبة 🕋
      </div>
      
      <div className="bg-white p-3 sm:p-4 rounded-2xl border-4 border-amber-200 shadow-md" dir="ltr">
        {MAZE.map((row, y) => (
          <div key={y} className="flex">
            {row.split('').map((cell, x) => (
              <div key={`${x}-${y}`} className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 border border-amber-50 flex items-center justify-center relative overflow-hidden bg-amber-50/50">
                {cell === '#' && <div className="w-full h-full bg-[#A1887F] rounded-sm transform scale-[1.05]" />}
                {cell === 'E' && <div className="text-3xl sm:text-4xl relative z-10 w-full h-full flex items-center justify-center drop-shadow-md">🕋</div>}
                {cell === 'S' && <div className="w-full h-full bg-emerald-50 rounded-sm" />}
                {pos.x === x && pos.y === y && (
                  <motion.div 
                    layoutId="player"
                    className="absolute z-20 text-3xl sm:text-4xl drop-shadow-md flex items-center justify-center inset-0"
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    🧑
                  </motion.div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-3 gap-3 mt-8 w-60" dir="ltr">
        <div />
        <button type="button" aria-label="تحرك لأعلى" onClick={() => move(0, -1)} className="flex items-center justify-center p-4 bg-[#4FC3F7] rounded-xl text-white shadow-[0_4px_0_0_#0288D1] active:translate-y-1 active:shadow-none hover:bg-[#29B6F6]"><ArrowUp size={36} strokeWidth={3} /></button>
        <div />
        <button type="button" aria-label="تحرك لليسار" onClick={() => move(-1, 0)} className="flex items-center justify-center p-4 bg-[#4FC3F7] rounded-xl text-white shadow-[0_4px_0_0_#0288D1] active:translate-y-1 active:shadow-none hover:bg-[#29B6F6]"><ArrowLeft size={36} strokeWidth={3} /></button>
        <button type="button" aria-label="تحرك لأسفل" onClick={() => move(0, 1)} className="flex items-center justify-center p-4 bg-[#4FC3F7] rounded-xl text-white shadow-[0_4px_0_0_#0288D1] active:translate-y-1 active:shadow-none hover:bg-[#29B6F6]"><ArrowDown size={36} strokeWidth={3} /></button>
        <button type="button" aria-label="تحرك لليمين" onClick={() => move(1, 0)} className="flex items-center justify-center p-4 bg-[#4FC3F7] rounded-xl text-white shadow-[0_4px_0_0_#0288D1] active:translate-y-1 active:shadow-none hover:bg-[#29B6F6]"><ArrowRight size={36} strokeWidth={3} /></button>
      </div>
    </div>
  );
}
