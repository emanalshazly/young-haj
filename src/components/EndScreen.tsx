import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Award, Star, CheckCircle2, Download } from 'lucide-react';
import { journeyData } from '../data';

interface Props {
  key?: string;
  onRestart: () => void;
  stars: number;
  totalStars: number;
}

export function EndScreen({ onRestart, stars, totalStars }: Props) {
  const [childName, setChildName] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const downloadCertificate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set standard certificate dimensions
    canvas.width = 1200;
    canvas.height = 840;
    
    // Draw Background
    ctx.fillStyle = "#FFF8E1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw Outer Border
    ctx.strokeStyle = "#A1887F";
    ctx.lineWidth = 30;
    ctx.strokeRect(15, 15, canvas.width - 30, canvas.height - 30);
    
    // Draw Inner Border
    ctx.strokeStyle = "#FFD54F";
    ctx.lineWidth = 15;
    ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.direction = 'rtl';
    
    // Title
    ctx.fillStyle = "#5D4037";
    ctx.font = "bold 90px 'Tajawal', sans-serif";
    ctx.fillText("شهادة إتمام رحلة الحج", canvas.width / 2, 220);
    
    // Subtitle
    ctx.fillStyle = "#8D6E63";
    ctx.font = "bold 45px 'Tajawal', sans-serif";
    ctx.fillText("تُمنح هذه الشهادة للبطل:", canvas.width / 2, 380);
    
    // Child Name
    ctx.fillStyle = "#F57F17";
    ctx.font = "black 100px 'Tajawal', sans-serif";
    ctx.fillText(childName || "بطل الحج الصغير", canvas.width / 2, 500);
    
    // Score Text
    ctx.fillStyle = "#5D4037";
    ctx.font = "bold 40px 'Tajawal', sans-serif";
    ctx.fillText(`لإتمامه رحلة الحاج الصغير متفوقاً وحصوله على ${stars} نجوم!`, canvas.width / 2, 630);
    
    // Emoji / Icon placeholder
    ctx.font = "100px sans-serif";
    ctx.fillText("🕋", canvas.width / 2, 740);

    // Trigger Download
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `شهادة_الحاج_${childName || 'بطل'}.png`;
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-4xl w-full mx-auto p-4 flex flex-col items-center min-h-[80vh] justify-center"
    >
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 w-full border-8 border-[#A1887F] text-center relative overflow-hidden">
        {/* Background rays effect */}
        <div className="absolute inset-0 z-0 bg-[#FFF8E1] pointer-events-none opacity-40"></div>
        <canvas ref={canvasRef} className="hidden" />
        
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
        
        <div className="flex flex-col gap-4 mb-8 w-full text-right relative z-10 bg-[#FFF8E1] p-8 rounded-3xl border-4 border-[#FFD54F] shadow-sm">
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
        
        <div className="relative z-10 bg-white p-6 md:p-8 rounded-3xl border-4 border-[#A1887F] mb-10 w-full flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-start gap-2 w-full md:w-auto flex-1">
             <h4 className="text-2xl font-bold text-[#5D4037]">احصل على شهادة البطل! 📜</h4>
             <input type="text" value={childName} onChange={(e) => setChildName(e.target.value)} placeholder="اكتب اسم البطل هنا..." className="w-full text-xl font-bold border-4 border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-[#FFB300] text-[#5D4037] placeholder-slate-400" />
          </div>
          <button onClick={downloadCertificate} className="w-full md:w-auto flex items-center justify-center gap-3 px-8 py-5 bg-[#FFD54F] text-[#5D4037] font-black rounded-2xl text-2xl shadow-[0_6px_0_0_#FBC02D] hover:bg-[#FFCA28] hover:translate-y-1 hover:shadow-[0_2px_0_0_#FBC02D] transition-all focus:outline-none">
            <span>تحميل الشهادة</span>
            <Download size={28} strokeWidth={3} />
          </button>
        </div>

        <button
          onClick={onRestart}
          className="relative z-10 inline-flex items-center justify-center px-12 py-6 bg-[#4CAF50] text-white font-black rounded-2xl text-3xl md:text-4xl shadow-[0_8px_0_0_#2E7D32] hover:bg-[#66BB6A] active:translate-y-1 active:shadow-none transition-all focus:outline-none w-full sm:w-auto"
        >
          العب مرة أخرى 🔄
        </button>
      </div>
    </motion.div>
  );
}
