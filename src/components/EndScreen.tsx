import { motion } from 'motion/react';
import { Award, Star, CheckCircle2 } from 'lucide-react';
import { journeyData } from '../data';

interface Props {
  key?: string;
  onRestart: () => void;
  stars: number;
  totalStars: number;
}

export function EndScreen({ onRestart, stars, totalStars }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full mx-auto p-4 flex flex-col items-center min-h-[80vh] justify-center"
    >
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 w-full border-8 border-[#A1887F] text-center relative overflow-hidden">
        {/* Background rays effect */}
        <div className="absolute inset-0 z-0 bg-[#FFF8E1] pointer-events-none opacity-40"></div>
        
        <motion.div
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", bounce: 0.6, duration: 1.2 }}
          className="mx-auto w-40 h-40 bg-[#FFD54F] rounded-[40px] flex items-center justify-center text-[#5D4037] mb-8 relative z-10 shadow-lg border-8 border-[#FBC02D] rotate-3"
        >
          <Award size={80} className="-rotate-3" strokeWidth={2} />
          {/* Sparkles around central award */}
          {[...Array(5)].map((_, i) => (
             <motion.div 
               key={i}
               className="absolute text-[#FBC02D] fill-current"
               initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
               animate={{ 
                 opacity: [0, 1, 0], 
                 scale: [0, 1.5, 0],
                 x: Math.cos(i * (Math.PI * 2 / 5)) * 100,
                 y: Math.sin(i * (Math.PI * 2 / 5)) * 100,
               }}
               transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
             >
               ✨
             </motion.div>
          ))}
        </motion.div>
        
        <h1 className="text-5xl md:text-7xl font-black text-[#5D4037] mb-6 relative z-10 tracking-tight leading-tight">
          مبارك أيها البطل!
        </h1>
        <p className="text-2xl md:text-3xl text-[#5D4037] mb-6 font-bold relative z-10 bg-[#FFFDB8] p-4 rounded-3xl border-4 border-[#FFD54F] inline-block px-10 shadow-sm">
          لقد أكملت رحلة الحاج الصغير بنجاح 🕋
        </p>

        <div className="flex items-center justify-center gap-4 mb-4 relative z-10">
          <div className="bg-[#FFFDB8] px-8 py-4 rounded-3xl border-4 border-[#FFD54F] shadow-sm flex items-center gap-4 mb-6">
            <span className="text-4xl font-black text-[#5D4037]" dir="ltr">{stars} / {totalStars}</span>
            <Star size={44} className="text-[#F57F17] fill-current" />
          </div>
        </div>
        
        <div className="flex flex-col gap-4 mb-12 w-full text-right relative z-10 bg-[#FFF8E1] p-8 rounded-3xl border-4 border-[#FFD54F] shadow-sm">
           <div className="flex items-center gap-3 mb-6 border-b-4 border-dashed border-[#FFB300] pb-4">
             <Star className="text-[#F57F17] fill-current w-12 h-12" />
             <h3 className="text-4xl font-black text-[#5D4037]">جواهر تعلمناها اليوم:</h3>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {journeyData.map((step) => (
               <motion.div 
                 key={step.id} 
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="flex flex-row items-center gap-4 bg-white p-5 rounded-2xl border-4 border-amber-200 shadow-sm"
               >
                 <CheckCircle2 className="text-[#4CAF50] w-10 h-10 flex-shrink-0" />
                 <div>
                   <h4 className="text-xl font-bold text-[#5D4037] mb-1">{step.title}</h4>
                   <p className="text-lg text-[#8D6E63] font-medium leading-snug">{step.valueLearned}</p>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>

        <button
          onClick={onRestart}
          className="relative z-10 inline-flex items-center justify-center px-12 py-6 bg-[#4CAF50] text-white font-black rounded-2xl text-4xl shadow-[0_8px_0_0_#2E7D32] hover:bg-[#66BB6A] active:translate-y-1 active:shadow-none transition-all focus:outline-none"
        >
          العب مرة أخرى 🔄
        </button>
      </div>
    </motion.div>
  );
}
