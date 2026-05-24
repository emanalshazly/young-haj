import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shirt, RotateCw, Footprints, Users, Target, Mic2 } from 'lucide-react';
import { audio } from '../utils/audio';

const CARDS = [
  { id: 'shirt', icon: Shirt, color: 'text-sky-500' },
  { id: 'rotate', icon: RotateCw, color: 'text-amber-500' },
  { id: 'footprints', icon: Footprints, color: 'text-emerald-500' },
  { id: 'users', icon: Users, color: 'text-purple-500' },
  { id: 'target', icon: Target, color: 'text-rose-500' },
  { id: 'mic', icon: Mic2, color: 'text-blue-500' }
];

export function MemoryGame({ onComplete }: { onComplete: (stars: number) => void }) {
  const [cards, setCards] = useState<any[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [latestMatch, setLatestMatch] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((c, i) => ({ ...c, uid: i }));
    setCards(shuffled);
  }, []);

  useEffect(() => {
    if (flipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = flipped;
      if (cards[first].id === cards[second].id) {
        setSolved(prev => [...prev, first, second]);
        setFlipped([]);
        audio.playSuccess();
        
        // Trigger success animation
        setLatestMatch([first, second]);
        setTimeout(() => setLatestMatch([]), 1500);

        if (solved.length + 2 === cards.length) {
          const stars = moves < 10 ? 3 : moves < 15 ? 2 : 1;
          setTimeout(() => onComplete(stars), 1500);
        }
      } else {
        setTimeout(() => setFlipped([]), 1000);
      }
    }
  }, [flipped, solved, cards, moves, onComplete]);

  return (
    <div className="bg-[#FFF8E1] rounded-3xl p-6 md:p-8 w-full mb-4 border-4 border-[#FFD54F] shadow-sm relative z-10 mt-6 flex flex-col items-center">
      <div className="inline-block bg-[#FFB300] text-white font-bold px-6 py-2 rounded-full mb-6 transform -translate-y-12 shadow-sm border-4 border-white text-xl">
        كروت الذاكرة 🧩
      </div>
      <div className="grid grid-cols-3 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-lg mb-4" dir="ltr">
        {cards.map((c, i) => {
          const isFlipped = flipped.includes(i) || solved.includes(i);
          const isLatest = latestMatch.includes(i);
          const Icon = c.icon;
          return (
            <motion.button 
              key={c.uid}
              onClick={() => {
                if (flipped.length < 2 && !isFlipped) {
                  audio.playPop();
                  setFlipped([...flipped, i]);
                }
              }}
              animate={
                isLatest 
                  ? { scale: [1, 1.15, 0.9, 1.05, 1], rotate: [0, -5, 5, -5, 0] } 
                  : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.6 }}
              className={`h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 mx-auto flex items-center justify-center rounded-2xl border-4 transition-colors relative overflow-visible shadow-sm hover:-translate-y-1 ${
                isFlipped 
                  ? isLatest ? 'bg-emerald-50 border-[#4CAF50]' : 'bg-white border-[#4CAF50]' 
                  : 'bg-[#FFD54F] border-[#FBC02D]'
              }`}
            >
             {isLatest && (
               <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
                 {[...Array(3)].map((_, starIdx) => (
                   <motion.div
                     key={starIdx}
                     className="absolute text-2xl drop-shadow-md"
                     initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                     animate={{ 
                        opacity: [1, 1, 0],
                        scale: [0, 1.5, 0.5],
                        x: (Math.random() - 0.5) * 80,
                        y: (Math.random() - 0.5) * 80 - 20
                     }}
                     transition={{ duration: 1, ease: "easeOut" }}
                   >
                     ⭐
                   </motion.div>
                 ))}
               </div>
             )}
             <AnimatePresence>
               {isFlipped ? (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   className={`absolute inset-0 flex items-center justify-center rounded-xl z-10 ${isLatest ? 'bg-emerald-50' : 'bg-white'}`}
                 >
                   <Icon size={40} className={c.color} />
                 </motion.div>
               ) : (
                 <motion.span 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   className="text-4xl text-white font-black absolute z-10"
                 >
                   ?
                 </motion.span>
               )}
             </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      <div className="mt-2 text-[#8D6E63] font-bold text-xl bg-white px-6 py-2 rounded-full border-2 border-amber-200">
        المحاولات: {moves}
      </div>
    </div>
  );
}
