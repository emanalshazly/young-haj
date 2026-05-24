import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, HelpCircle, X } from 'lucide-react';

interface Props {
  key?: string;
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: Props) {
  const [showTutorial, setShowTutorial] = useState(false);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -50 }}
        className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 w-full relative z-10"
      >
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="text-[120px] mb-8 relative drop-shadow-xl"
        >
          🕋
          <motion.div 
              className="absolute -top-4 -right-12 text-6xl"
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 3 }}
          >
            ✨
          </motion.div>
        </motion.div>
        
        <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 border-8 border-[#A1887F] w-full max-w-2xl flex flex-col items-center relative overflow-hidden">
          <h1 className="text-5xl md:text-7xl font-black text-[#5D4037] mb-6 tracking-tight z-10 leading-tight">
            رحلة الحاج الصغير
          </h1>
          <p className="text-2xl md:text-3xl text-[#8D6E63] mb-10 font-medium leading-relaxed max-w-lg mx-auto z-10">
            نتعلّم آيات الحج، وأفضل الأعمال، ودعاء التلبية في رحلة مبسطة وممتعة!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center z-10">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center px-8 py-5 font-black text-white bg-[#4CAF50] rounded-2xl text-2xl md:text-3xl shadow-[0_8px_0_0_#2E7D32] hover:bg-[#66BB6A] active:translate-y-1 active:shadow-none transition-all focus:outline-none w-full sm:w-auto flex-1 max-w-[280px]"
            >
              <span className="ml-3">ابدأ التحدي!</span>
              <Play className="w-8 h-8 fill-current" />
            </button>
            <button
              onClick={() => setShowTutorial(true)}
              className="group relative inline-flex items-center justify-center px-8 py-5 font-black text-[#5D4037] bg-[#FFD54F] rounded-2xl text-2xl md:text-3xl shadow-[0_8px_0_0_#FBC02D] hover:bg-[#FFCA28] active:translate-y-1 active:shadow-none transition-all focus:outline-none w-full sm:w-auto flex-1 max-w-[280px]"
            >
              <span className="ml-3">كيف ألعب؟</span>
              <HelpCircle className="w-8 h-8" strokeWidth={3} />
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showTutorial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowTutorial(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-[#FFF8E1] rounded-[40px] p-6 md:p-10 border-8 border-[#A1887F] shadow-2xl max-w-2xl w-full flex flex-col items-center relative overflow-hidden"
              onClick={e => e.stopPropagation()}
              dir="rtl"
            >
              <button 
                onClick={() => setShowTutorial(false)} 
                className="absolute top-6 left-6 text-[#A1887F] hover:text-[#5D4037] transition-colors p-2 bg-white rounded-full border-4 border-slate-200"
              >
                <X size={28} strokeWidth={4} />
              </button>
              
              <h2 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-8 mt-4 md:mt-0">كيف نلعب؟ 🎮</h2>

              <div className="flex flex-col gap-4 md:gap-6 w-full relative z-10">
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-4 border-[#FFD54F] shadow-sm">
                  <div className="w-14 h-14 bg-[#FFF9C4] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">📖</div>
                  <p className="text-xl md:text-2xl font-bold text-[#5D4037]">اقرأ المعلومات في كل محطة بتركيز.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-4 border-[#FFD54F] shadow-sm">
                  <div className="w-14 h-14 bg-[#FFF9C4] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">🤔</div>
                  <p className="text-xl md:text-2xl font-bold text-[#5D4037]">أجب عن سؤال التحدي بذكاء.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-4 border-[#FFD54F] shadow-sm">
                  <div className="w-14 h-14 bg-[#FFF9C4] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">⭐</div>
                  <p className="text-xl md:text-2xl font-bold text-[#5D4037]">اجمع 3 نجوم بإجابتك الصحيحة من المحاولة الأولى.</p>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border-4 border-[#FFD54F] shadow-sm">
                  <div className="w-14 h-14 bg-[#FFF9C4] rounded-xl flex items-center justify-center text-3xl flex-shrink-0">🕋</div>
                  <p className="text-xl md:text-2xl font-bold text-[#5D4037]">أكمل جميع المحطات لتصبح بطل الحج!</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowTutorial(false);
                  onStart();
                }}
                className="mt-8 px-10 py-5 font-black text-white bg-[#4CAF50] rounded-2xl text-2xl shadow-[0_6px_0_0_#2E7D32] hover:bg-[#66BB6A] active:translate-y-1 active:shadow-none transition-all w-full sm:w-auto"
              >
                أنا مستعد! 🚀
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

