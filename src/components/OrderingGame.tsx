import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Circle, Footprints, RotateCw, Shirt, Target, Users } from 'lucide-react';
import { audio } from '../utils/audio';
import { shuffleWith } from '../domain/shuffle';

const CORRECT_ORDER = [
  { id: '1', text: 'الإحرام', icon: 'Shirt' },
  { id: '2', text: 'الطواف', icon: 'RotateCw' },
  { id: '3', text: 'السعي', icon: 'Footprints' },
  { id: '4', text: 'الوقوف بعرفة', icon: 'Users' },
  { id: '5', text: 'رمي الجمرات', icon: 'Target' },
];

export function OrderingGame({ onComplete, random = Math.random }: { onComplete: (stars: number) => void; random?: () => number }) {
  const [available, setAvailable] = useState<any[]>([]);
  const [selected, setSelected] = useState<any[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWrong, setIsWrong] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Shuffle available on mount
    const shuffled = shuffleWith(CORRECT_ORDER, random);
    setAvailable(shuffled);
  }, [random]);

  const handleSelect = (item: any) => {
    if (isCorrect) return; // already done
    audio.playPop();
    setIsWrong(false);
    setAvailable(available.filter(i => i.id !== item.id));
    const newSelected = [...selected, item];
    setSelected(newSelected);

    if (newSelected.length === CORRECT_ORDER.length) {
      checkOrder(newSelected);
    }
  };

  const handleDeselect = (item: any) => {
    if (isCorrect) return; // already done
    audio.playPop();
    setIsWrong(false);
    setSelected(selected.filter(i => i.id !== item.id));
    setAvailable([...available, item]);
  };

  const checkOrder = (currentSelected: any[]) => {
    const isMatch = currentSelected.every((item, i) => item.id === CORRECT_ORDER[i].id);
    if (isMatch) {
      audio.playSuccess();
      setIsCorrect(true);
      const stars = moves === 0 ? 3 : moves < 3 ? 2 : 1;
      setTimeout(() => onComplete(stars), 1500);
    } else {
      audio.playError();
      setIsWrong(true);
      setMoves(moves + 1);
      setTimeout(() => {
        setIsWrong(false);
        // Reset after wrong
        setSelected([]);
        const shuffled = shuffleWith(CORRECT_ORDER, random);
        setAvailable(shuffled);
      }, 1500);
    }
  };

  return (
    <div className="bg-[#FFF8E1] rounded-3xl p-6 md:p-8 w-full mb-4 border-4 border-[#FFD54F] shadow-sm relative z-10 mt-6 flex flex-col items-center select-none">
      <div className="inline-block bg-[#FFB300] text-white font-bold px-6 py-2 rounded-full mb-6 transform -translate-y-12 shadow-sm border-4 border-white text-xl">
        لعبة ترتيب المناسك 📝
      </div>

      <div className="w-full max-w-2xl text-center">
        <p className="text-xl md:text-2xl text-[#5D4037] mb-6 font-bold font-sans">
          اضغط على المناسك في الأسفل بالترتيب الصحيح لتكوين رحلة الحج
        </p>

        {/* Selected List */}
        <div className={`min-h-[100px] w-full bg-white p-4 rounded-3xl border-4 ${isWrong ? 'border-[#EF5350] bg-[#FFEBEE]' : isCorrect ? 'border-[#4CAF50] bg-[#E8F5E9]' : 'border-amber-200'} mb-8 flex flex-wrap gap-3 justify-center items-center shadow-inner`}>
          <AnimatePresence>
            {selected.length === 0 && !isCorrect && !isWrong && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                className="text-amber-600/50 font-bold text-xl h-full flex items-center"
              >
                المكان فارغ.. ابدأ بالاختيار من الأسفل!
              </motion.span>
            )}
            {selected.map((item, index) => {
              const iconMap = { Shirt, RotateCw, Footprints, Users, Target };
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Circle;
              return (
                <motion.button
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={item.id}
                  onClick={() => handleDeselect(item)}
                  aria-label={`إزالة ${item.text} من الترتيب`}
                  className="bg-[#FFD54F] border-4 border-[#FBC02D] text-[#5D4037] px-4 py-3 rounded-2xl font-bold flex items-center gap-3 cursor-pointer shadow-sm hover:-translate-y-1 transition-transform"
                >
                  <span className="bg-white text-[#F57F17] w-6 h-6 rounded-full flex items-center justify-center font-black">
                    {index + 1}
                  </span>
                  {item.text}
                  <Icon size={20} className="opacity-80" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Available List */}
        <div className="flex flex-wrap gap-4 justify-center min-h-[60px]">
          <AnimatePresence>
            {available.map((item) => {
              const iconMap = { Shirt, RotateCw, Footprints, Users, Target };
              const Icon = iconMap[item.icon as keyof typeof iconMap] || Circle;
              return (
                <motion.button
                  type="button"
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  aria-label={`إضافة ${item.text} إلى الترتيب`}
                  className="bg-white border-4 border-slate-200 text-[#5D4037] px-6 py-4 rounded-2xl font-bold flex items-center gap-3 cursor-pointer hover:border-[#4FC3F7] hover:bg-sky-50 shadow-md hover:-translate-y-1 transition-all"
                >
                  {item.text}
                  <Icon size={24} className="text-[#0288D1]" />
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
