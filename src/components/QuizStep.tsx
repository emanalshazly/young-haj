import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { JourneyStep, Option } from '../types';
import * as Icons from 'lucide-react';
import { MemoryGame } from './MemoryGame';
import { MazeGame } from './MazeGame';
import { OrderingGame } from './OrderingGame';
import { speak, stopSpeech } from '../utils/speech';
import { audio } from '../utils/audio';
import { journeyData } from '../data';

interface Props {
  key?: string;
  step: JourneyStep;
  stepNumber: number;
  totalSteps: number;
  onNext: (starsEarned: number) => void;
}

export function QuizStep({ step, stepNumber, totalSteps, onNext }: Props) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [starsEarned, setStarsEarned] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);

  // Auto-play content and reset state when step changes
  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
    setAttempts(0);
    setStarsEarned(0);
    setTimeLeft(step.type === 'quiz' ? 30 : 60);
    
    stopSpeech();
    const textToSpeak = `${step.title}. ${step.description} ${step.type === 'quiz' && step.question ? step.question : ''}`;
    speak(textToSpeak);
    
    return () => stopSpeech();
  }, [step.id, step.title, step.description, step.type, step.question]);

  // Timer effect
  useEffect(() => {
    if (isCorrect !== null || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [isCorrect, timeLeft]);

  // Timeout handling
  useEffect(() => {
    if (timeLeft === 0 && isCorrect === null) {
      setIsCorrect(false);
      setSelectedOption('timeout');
      setAttempts(prev => prev + 1);
      audio.playError();
    }
  }, [timeLeft, isCorrect]);

  const replayAudio = () => {
    const textToSpeak = `${step.title}. ${step.description} ${step.type === 'quiz' && step.question ? step.question : ''}`;
    speak(textToSpeak);
  };

  const IconComponent = (Icons as any)[step.iconName] || Icons.HelpCircle;

  const handleOptionClick = (option: Option) => {
    if (selectedOption) return; // Prevent multiple clicks
    setSelectedOption(option.id);
    setIsCorrect(option.isCorrect);
    if (!option.isCorrect) {
      setAttempts(prev => prev + 1);
    } else {
      setStarsEarned(attempts === 0 ? 3 : 1);
    }
  };

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="max-w-4xl w-full mx-auto p-4 flex flex-col items-center"
    >
      {/* Interactive Journey Map */}
      <div className="w-full max-w-4xl mx-auto mb-10 relative px-2 sm:px-6 z-10 font-sans mt-4">
        <div className="bg-[#FFF8E1] rounded-3xl p-4 sm:p-6 border-4 border-[#FFD54F] shadow-sm relative overflow-hidden">
          <div className="absolute top-2 right-4 text-[#FFB300] font-black text-sm md:text-base opacity-80">
            خريطة الرحلة
          </div>

          <div className="relative mt-8 sm:mt-10 mb-4 h-16 sm:h-20 flex items-center justify-between">
            {/* The dashed connection line */}
            <div className="absolute left-2 right-2 sm:left-4 sm:right-4 top-1/2 -translate-y-1/2 h-3 bg-white rounded-full border-2 border-dashed border-amber-300"></div>
            
            {/* The filled progress line */}
            <div className="absolute right-2 sm:right-4 left-2 sm:left-4 top-1/2 -translate-y-1/2 h-3 overflow-hidden rounded-full pointer-events-none">
              <motion.div 
                className="absolute right-0 top-0 bottom-0 bg-[#4CAF50] rounded-full origin-right"
                initial={{ width: `${((stepNumber - 1) / (totalSteps - 1)) * 100}%` }}
                animate={{ width: `${((stepNumber - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.6, type: "spring" }}
              />
            </div>

            {/* Nodes */}
            {journeyData.slice(0, totalSteps).map((jStep, i) => {
              const isPast = i < stepNumber - 1;
              const isCurrent = i === stepNumber - 1;
              const isActive = isPast || isCurrent;
              const Icon = (Icons as any)[jStep.iconName] || Icons.Circle;

              return (
                <div key={i} className="relative z-10 flex flex-col items-center justify-center">
                  {/* Current step character avatar */}
                  {isCurrent && (
                    <motion.div 
                      layoutId="journey-avatar"
                      className="absolute -top-14 sm:-top-16 z-40 flex items-center justify-center"
                    >
                      <motion.div
                        className="relative origin-bottom"
                        initial={{ y: -30, scale: 0.8, rotate: -20 }}
                        animate={{ 
                          y: [0, -40, 0, -15, 0], 
                          scale: [1, 1.1, 1, 1.05, 1],
                          rotate: [0, 15, -10, 5, 0] 
                        }}
                        transition={{ 
                          duration: 1.2,
                          ease: "easeOut"
                        }}
                      >
                        <motion.div
                          className="text-4xl sm:text-5xl drop-shadow-md"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut", delay: 1.2 }}
                        >
                          🚶
                        </motion.div>
                        <motion.div 
                          className="absolute -right-5 -top-5 text-3xl drop-shadow-sm origin-bottom-left z-50"
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ 
                            opacity: [0, 1, 1, 1, 1, 0], 
                            rotate: [0, 30, -20, 30, -20, 0],
                            scale: [0, 1, 1, 1, 1, 0.5]
                          }}
                          transition={{ delay: 0.8, duration: 2.5 }}
                        >
                          👋
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  )}

                  <motion.div
                     animate={{
                       scale: isCurrent ? 1.25 : 1,
                       backgroundColor: isActive ? '#4CAF50' : '#FFF',
                       borderColor: isActive ? '#2E7D32' : '#FFD54F',
                       color: isActive ? '#FFF' : '#FFB300'
                     }}
                     transition={{ duration: 0.4, type: "spring" }}
                     className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full border-4 flex items-center justify-center font-bold shadow-md transition-colors ${isCurrent ? 'ring-4 ring-emerald-200 z-20' : 'z-10'}`}
                  >
                    {isPast ? <Icons.Check size={18} strokeWidth={4} /> : <Icon size={18} strokeWidth={3} className={isCurrent ? "animate-pulse" : ""} />}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timer Display */}
      <div className="w-full max-w-2xl mx-auto mb-4 flex justify-end px-4 relative z-20">
        <motion.div 
          animate={timeLeft <= 10 && timeLeft > 0 ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className={`flex items-center gap-2 px-6 py-2 rounded-full border-4 shadow-sm font-bold text-xl ${
            timeLeft <= 10 ? 'bg-[#FFEBEE] border-[#EF5350] text-[#C62828]' : 'bg-white border-[#4FC3F7] text-[#0288D1]'
          }`}
        >
          <Icons.Timer size={24} className={timeLeft <= 10 ? 'text-[#EF5350] animate-pulse' : 'text-[#0288D1]'} />
          <span dir="ltr">00:{String(timeLeft).padStart(2, '0')}</span>
        </motion.div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-[40px] shadow-2xl p-8 md:p-12 w-full border-8 border-[#A1887F] flex flex-col items-center text-center relative overflow-hidden">
        {/* Decorative corner circles */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-amber-50 rounded-full mix-blend-multiply opacity-50 pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-56 h-56 bg-amber-50 rounded-full mix-blend-multiply opacity-50 pointer-events-none"></div>
        
        <button 
          onClick={replayAudio}
          className="absolute top-6 left-6 text-[#A1887F] hover:text-[#5D4037] hover:bg-slate-100 transition-colors p-3 bg-white rounded-full border-4 border-slate-200 z-20"
          title="استمع"
        >
          <Icons.Volume2 size={32} strokeWidth={3} />
        </button>
        
        <span className="text-[120px] leading-none font-black text-[#FFB300] opacity-20 block absolute top-4 right-10 pointer-events-none">
           {String(stepNumber).padStart(2, '0')}
        </span>
        
        <motion.div 
           initial={{ scale: 0 }}
           animate={{ scale: 1 }}
           transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
           className="w-28 h-28 bg-[#FFD54F] rounded-3xl flex items-center justify-center mb-6 text-[#5D4037] shadow-lg border-4 border-[#FBC02D] rotate-3 relative z-10"
        >
          <IconComponent size={56} className="-rotate-3" />
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl font-black text-[#5D4037] mb-4 z-10 tracking-tight">{step.title}</h2>
        <p className="text-2xl md:text-3xl text-[#8D6E63] mb-10 leading-relaxed max-w-2xl z-10 border-b-4 border-dashed border-[#FFB300] pb-8">
          {step.description}
        </p>

        {/* Content Section */}
        {step.type === 'memory' ? (
          <MemoryGame onComplete={(stars) => { setIsCorrect(true); setStarsEarned(stars); }} />
        ) : step.type === 'maze' ? (
          <MazeGame onComplete={(stars) => { setIsCorrect(true); setStarsEarned(stars); }} />
        ) : step.type === 'ordering' ? (
          <OrderingGame onComplete={(stars) => { setIsCorrect(true); setStarsEarned(stars); }} />
        ) : (
          <div className="bg-[#FFF8E1] rounded-3xl p-6 md:p-8 w-full mb-4 border-4 border-[#FFD54F] shadow-sm relative z-10 mt-6">
            <div className="inline-block bg-[#FFB300] text-white font-bold px-6 py-2 rounded-full mb-6 transform -translate-y-12 shadow-sm border-4 border-white text-xl">
              سؤال التحدي 🤔
            </div>
            <p className="text-3xl text-[#5D4037] mb-8 font-black leading-snug">{step.question}</p>
            
            <div className="flex flex-col gap-4">
              {step.options?.map((option, idx) => (
                <button
                  key={option.id}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionClick(option)}
                  className={`p-6 rounded-2xl text-2xl font-bold border-4 transition-all flex items-center justify-between group ${
                    selectedOption === null
                      ? 'border-[#FFD54F] bg-white hover:border-[#FFB300] hover:bg-[#FFFDE7] hover:-translate-y-1 text-[#5D4037] shadow-sm'
                      : option.id === selectedOption
                        ? option.isCorrect
                          ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#2E7D32] shadow-md transform scale-[1.02]'
                          : 'border-[#EF5350] bg-[#FFEBEE] text-[#C62828] shadow-md transform scale-[1.02]'
                        : option.isCorrect && selectedOption !== null
                          ? 'border-[#4CAF50] bg-[#E8F5E9] text-[#2E7D32] opacity-80'
                          : 'border-slate-200 bg-slate-50 text-slate-400 opacity-40'
                  }`}
                >
                  <span className="flex-1 text-right pr-2">{option.text}</span>
                  <div className={`w-10 h-10 rounded-full border-4 flex items-center justify-center flex-shrink-0 ml-2 ${
                    selectedOption === null ? 'border-[#FFD54F] bg-[#FFF8E1] group-hover:border-[#FFB300] group-hover:bg-[#FFFDE7]' : 
                    (option.id === selectedOption && option.isCorrect) || (option.isCorrect && selectedOption !== null) ? 'border-[#4CAF50] bg-[#4CAF50] text-white' :
                    option.id === selectedOption && !option.isCorrect ? 'border-[#EF5350] bg-[#EF5350] text-white' : 'border-slate-200 bg-transparent'
                  }`}>
                    {((option.id === selectedOption && option.isCorrect) || (option.isCorrect && selectedOption !== null)) && <Icons.Check size={20} strokeWidth={4} />}
                    {option.id === selectedOption && !option.isCorrect && <Icons.X size={20} strokeWidth={4} />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        <AnimatePresence>
          {isCorrect !== null && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              className="w-full relative z-10"
            >
              <div className={`p-8 rounded-3xl mt-6 border-8 shadow-lg ${isCorrect ? 'bg-[#E8F5E9] border-[#4CAF50] text-[#2E7D32]' : 'bg-[#FFEBEE] border-[#EF5350] text-[#C62828]'}`}>
                <div className="flex items-center justify-center gap-4 mb-4">
                  {isCorrect ? <Icons.Trophy size={48} className="text-[#4CAF50]" /> : <Icons.RotateCcw size={48} className="text-[#EF5350]" />}
                  <p className="text-4xl font-black">
                    {isCorrect ? 'رائع جداً يا بطل! 🎉' : (timeLeft === 0 ? 'انتهى الوقت! ⏰' : 'حاول مرة أخرى! 🤔')}
                  </p>
                </div>
                {isCorrect && (
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                    className="flex justify-center gap-3 mb-6"
                  >
                    {[...Array(3)].map((_, i) => (
                      <Icons.Star 
                        key={i} 
                        size={48} 
                        className={i < starsEarned ? "text-[#FFB300] fill-current drop-shadow-md" : "text-gray-300"} 
                      />
                    ))}
                  </motion.div>
                )}
                {isCorrect && (
                  <p className="text-2xl md:text-3xl mb-8 leading-relaxed font-bold text-center">{step.successMessage}</p>
                )}
                
                <button
                  onClick={isCorrect ? () => onNext(starsEarned) : () => {
                     setSelectedOption(null);
                     setIsCorrect(null);
                     setTimeLeft(step.type === 'quiz' ? 30 : 60);
                  }}
                  className={`px-10 py-6 font-black rounded-2xl text-3xl shadow-[0_8px_0_0_rgba(0,0,0,0.1)] hover:shadow-none hover:translate-y-1 transition-all focus:outline-none block mx-auto ${
                    isCorrect 
                      ? 'bg-[#4CAF50] hover:bg-[#66BB6A] text-white shadow-[0_8px_0_0_#2E7D32]' 
                      : 'bg-[#EF5350] hover:bg-[#E53935] text-white shadow-[0_8px_0_0_#C62828]'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    {isCorrect ? 'إلى المحطة التالية' : 'أنا مستعد، سأحاول مجدداً'}
                    {isCorrect && <Icons.ArrowLeft size={28} strokeWidth={3} />}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
