import { motion } from 'motion/react';
import { Play } from 'lucide-react';

interface Props {
  key?: string;
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -50 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6 w-full"
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
        
        <button
          onClick={onStart}
          className="group relative z-10 inline-flex items-center justify-center px-10 py-6 font-black text-white bg-[#4CAF50] rounded-2xl text-3xl shadow-[0_8px_0_0_#2E7D32] hover:bg-[#66BB6A] active:translate-y-1 active:shadow-none transition-all focus:outline-none w-full sm:w-auto"
        >
          <span className="ml-3">هيا بنا نبدأ التحدي!</span>
          <Play className="w-10 h-10 fill-current" />
        </button>
      </div>
    </motion.div>
  );
}
